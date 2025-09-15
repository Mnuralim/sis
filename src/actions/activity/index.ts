"use server";

import { imagekit } from "@/lib/imagekit";
import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "../session";

export const getAllActivity = unstable_cache(
  async function getAllActivity(params: ActivityPaginationParams) {
    const where: Prisma.ActivityWhereInput = {};

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

    const [activities, totalCount] = await Promise.all([
      prisma.activity.findMany({
        where,
        skip: parseInt(params.skip),
        take: parseInt(params.limit),
        orderBy: {
          [params.sortBy]: params.sortOrder === "asc" ? "asc" : "desc",
        },
      }),
      prisma.activity.count({
        where,
      }),
    ]);

    return {
      activities,
      totalCount,
      currentPage:
        Math.floor(parseInt(params.skip) / parseInt(params.limit)) + 1,
      totalPages: Math.ceil(totalCount / parseInt(params.limit)),
      itemsPerPage: parseInt(params.limit),
    };
  },
  ["getAllActivity"],
  {
    tags: ["activities"],
  }
);

export async function createActivity(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const name = formData.get("name") as string;
    const image = formData.get("image") as File;
    const description = formData.get("description") as string;

    if (!name) {
      return {
        error: "Nama kegiatan harus diisi.",
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
        folder: "/sis/activities",
      });
      imgUrl = uploadResponse.url;
    }

    await prisma.activity.create({
      data: {
        name,
        description,
        image: imgUrl,
        createdBy: session!.id,
        updatedBy: session!.id,
      },
    });

    revalidateTag("activities");
  } catch (error) {
    console.error("Error creating activity:", error);
    return {
      error: "Terjadi kesalahan saat menambahkan data kegiatan.",
    };
  }
  redirect(
    `/admin/activities?success=1&message=Data kegiatan berhasil ditambahkan.`
  );
}

export async function updateActivity(
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
        error: "Nama kegiatan harus diisi.",
      };
    }

    const existingActivity = await prisma.activity.findUnique({
      where: { id },
    });

    if (!existingActivity) {
      return {
        error: "Data kegiatan tidak ditemukan.",
      };
    }

    const session = await getSession();

    let imgUrl = existingActivity.image;
    if (image && image.size > 0) {
      const logoArrayBuffer = await image.arrayBuffer();
      const logoBuffer = Buffer.from(logoArrayBuffer);
      const uploadResponse = await imagekit.upload({
        file: logoBuffer,
        fileName: `image-${Date.now()}.${image.name.split(".").pop()}`,
        folder: "/sis/activities",
      });
      imgUrl = uploadResponse.url;
    }

    await prisma.activity.update({
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

    revalidateTag("activities");
  } catch (error) {
    console.error("Error updating activity:", error);
    return {
      error: "Terjadi kesalahan saat memperbarui data kegiatan.",
    };
  }
  redirect(
    `/admin/activities?success=1&message=Data kegiatan berhasil diperbarui.`
  );
}

export async function deleteActivity(id: string) {
  try {
    const existingActivity = await prisma.activity.findUnique({
      where: { id },
    });

    if (!existingActivity) {
      redirect(
        `/admin/activities?error=1&message=Data kegiatan tidak ditemukan.`
      );
    }

    await prisma.activity.delete({
      where: {
        id,
      },
    });

    revalidateTag("activities");
  } catch (error) {
    console.error("Error deleting activity:", error);
    redirect(
      `/admin/activities?error=1&message=Terjadi kesalahan saat menghapus data kegiatan.`
    );
  }
  redirect(
    `/admin/activities?success=1&message=Data kegiatan berhasil dihapus.`
  );
}
