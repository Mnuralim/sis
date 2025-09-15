"use server";

import { imagekit } from "@/lib/imagekit";
import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "../session";

export const getAllGallery = unstable_cache(
  async function getAllGallery(params: GalleryPaginationParams) {
    const where: Prisma.GalleryWhereInput = {};

    if (params.search) {
      where.OR = [
        {
          title: {
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

    const [galleries, totalCount] = await Promise.all([
      prisma.gallery.findMany({
        where,
        skip: parseInt(params.skip),
        take: parseInt(params.limit),
        orderBy: {
          [params.sortBy]: params.sortOrder === "asc" ? "asc" : "desc",
        },
      }),
      prisma.gallery.count({
        where,
      }),
    ]);

    return {
      galleries,
      totalCount,
      currentPage:
        Math.floor(parseInt(params.skip) / parseInt(params.limit)) + 1,
      totalPages: Math.ceil(totalCount / parseInt(params.limit)),
      itemsPerPage: parseInt(params.limit),
    };
  },
  ["getAllGallery"],
  {
    tags: ["galleries"],
  }
);

export async function createGallery(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const title = formData.get("title") as string;
    const image = formData.get("image") as File;
    const description = formData.get("description") as string;

    if (!title) {
      return {
        error: "Judul galeri harus diisi.",
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
        folder: "/sis/gallery",
      });
      imgUrl = uploadResponse.url;
    } else {
      return {
        error: "Gambar harus diunggah.",
      };
    }

    await prisma.gallery.create({
      data: {
        title,
        description,
        image: imgUrl,
        createdBy: session!.id,
        updatedBy: session!.id,
      },
    });

    revalidateTag("galleries");
  } catch (error) {
    console.error("Error creating gallery:", error);
    return {
      error: "Terjadi kesalahan saat menambahkan data galeri.",
    };
  }
  redirect(
    `/admin/galleries?success=1&message=Data galeri berhasil ditambahkan.`
  );
}

export async function updateGallery(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const image = formData.get("image") as File;
    const description = formData.get("description") as string;

    if (!title) {
      return {
        error: "Judul galeri harus diisi.",
      };
    }

    const existingGallery = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!existingGallery) {
      return {
        error: "Data galeri tidak ditemukan.",
      };
    }

    const session = await getSession();

    let imgUrl = existingGallery.image;
    if (image && image.size > 0) {
      const logoArrayBuffer = await image.arrayBuffer();
      const logoBuffer = Buffer.from(logoArrayBuffer);
      const uploadResponse = await imagekit.upload({
        file: logoBuffer,
        fileName: `image-${Date.now()}.${image.name.split(".").pop()}`,
        folder: "/sis/gallery",
      });
      imgUrl = uploadResponse.url;
    }

    await prisma.gallery.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        image: imgUrl,
        updatedBy: session!.id,
      },
    });

    revalidateTag("galleries");
  } catch (error) {
    console.error("Error updating gallery:", error);
    return {
      error: "Terjadi kesalahan saat memperbarui data galeri.",
    };
  }
  redirect(
    `/admin/galleries?success=1&message=Data galeri berhasil diperbarui.`
  );
}

export async function deleteGallery(id: string) {
  try {
    const existingGallery = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!existingGallery) {
      redirect(`/admin/galleries?error=1&message=Data galeri tidak ditemukan.`);
    }

    await prisma.gallery.delete({
      where: {
        id,
      },
    });

    revalidateTag("galleries");
  } catch (error) {
    console.error("Error deleting gallery:", error);
    redirect(
      `/admin/galleries?error=1&message=Terjadi kesalahan saat menghapus data galeri.`
    );
  }
  redirect(`/admin/galleries?success=1&message=Data galeri berhasil dihapus.`);
}
