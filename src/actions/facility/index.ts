"use server";

import { imagekit } from "@/lib/imagekit";
import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "../session";

export const getAllFacilities = unstable_cache(
  async function getAllFacilities(params: FacilityPaginationParams) {
    const where: Prisma.FacilityWhereInput = {};

    if (params.search) {
      where.OR = [
        {
          name: {
            contains: params.search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: params.search,
            mode: "insensitive",
          },
        },
      ];
    }

    const [facilities, totalCount] = await Promise.all([
      prisma.facility.findMany({
        where,
        skip: parseInt(params.skip),
        take: parseInt(params.limit),
        orderBy: {
          [params.sortBy]: params.sortOrder === "asc" ? "asc" : "desc",
        },
      }),
      prisma.facility.count({
        where,
      }),
    ]);

    return {
      facilities,
      totalCount,
      currentPage:
        Math.floor(parseInt(params.skip) / parseInt(params.limit)) + 1,
      totalPages: Math.ceil(totalCount / parseInt(params.limit)),
      itemsPerPage: parseInt(params.limit),
    };
  },
  ["getAllFacilities"],
  {
    tags: ["facilities"],
  }
);

export async function createFacility(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const name = formData.get("name") as string;
    const image = formData.get("image") as File;
    const description = formData.get("description") as string;

    console.log({
      name,
      image,
      description,
    });

    if (!name) {
      return {
        error: "Nama fasilitas harus diisi.",
      };
    }

    const session = await getSession();

    let imgUrl = null;
    if (image && image.size > 0) {
      const logoArrayBuffer = await image.arrayBuffer();
      const logoBuffer = Buffer.from(logoArrayBuffer);
      const uploadResponse = await imagekit.upload({
        file: logoBuffer,
        fileName: `image-${Date.now()}.${image.name.split(".").pop()}`,
        folder: "/sis/facilities",
      });
      imgUrl = uploadResponse.url;
    }

    await prisma.facility.create({
      data: {
        name,
        description,
        image: imgUrl,
        createdBy: session!.id,
        updatedBy: session!.id,
      },
    });

    revalidateTag("facilities");
  } catch (error) {
    console.error("Error creating facility:", error);
    return {
      error: "Terjadi kesalahan saat menambahkan data fasilitas.",
    };
  }
  redirect(
    `/admin/facilities?success=1&message=Data fasilitas berhasil ditambahkan.`
  );
}

export async function updateFacility(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const image = formData.get("image") as File;
    const description = formData.get("description") as string;

    if (!name) {
      return {
        error: "Nama fasilitas harus diisi.",
      };
    }

    const existingFacility = await prisma.facility.findUnique({
      where: { id },
    });

    if (!existingFacility) {
      return {
        error: "Fasilitas tidak ditemukan.",
      };
    }

    const session = await getSession();

    let imgUrl = existingFacility.image;
    if (image && image.size > 0) {
      const logoArrayBuffer = await image.arrayBuffer();
      const logoBuffer = Buffer.from(logoArrayBuffer);
      const uploadResponse = await imagekit.upload({
        file: logoBuffer,
        fileName: `image-${Date.now()}.${image.name.split(".").pop()}`,
        folder: "/sis/facilities",
      });
      imgUrl = uploadResponse.url;
    }

    await prisma.facility.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        image: imgUrl,
        updatedBy: session!.id,
      },
    });

    revalidateTag("facilities");
  } catch (error) {
    console.error("Error updating facility:", error);
    return {
      error: "Terjadi kesalahan saat memperbarui data fasilitas.",
    };
  }
  redirect(
    `/admin/facilities?success=1&message=Data fasilitas berhasil diperbarui.`
  );
}

export async function deleteFacility(id: string) {
  try {
    const existingFacility = await prisma.facility.findUnique({
      where: { id },
    });

    if (!existingFacility) {
      redirect(`/admin/facilities?error=1&message=Fasilitas tidak ditemukan.`);
    }

    await prisma.facility.delete({
      where: {
        id,
      },
    });

    revalidateTag("facilities");
  } catch (error) {
    console.error("Error deleting facility:", error);
    redirect(
      `/admin/facilities?error=1&message=Terjadi kesalahan saat menghapus data fasilitas.`
    );
  }
  redirect(
    `/admin/facilities?success=1&message=Data fasilitas berhasil dihapus.`
  );
}
