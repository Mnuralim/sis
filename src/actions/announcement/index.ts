"use server";

import { imagekit } from "@/lib/imagekit";
import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "../session";

export const getAllAnnouncements = unstable_cache(
  async function getAllAnnouncements(params: AnnouncementPaginationParams) {
    const where: Prisma.AnnouncementWhereInput = {};

    if (params.search) {
      where.OR = [
        {
          title: {
            contains: params.search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: params.search,
            mode: "insensitive",
          },
        },
      ];
    }

    const [announcements, totalCount] = await Promise.all([
      prisma.announcement.findMany({
        where,
        skip: parseInt(params.skip),
        take: parseInt(params.limit),
        include: {
          createdByAdmin: {
            select: {
              name: true,
              username: true,
            },
          },
          updatedByAdmin: {
            select: {
              name: true,
              username: true,
            },
          },
        },
        orderBy: {
          [params.sortBy]: params.sortOrder === "asc" ? "asc" : "desc",
        },
      }),
      prisma.announcement.count({
        where,
      }),
    ]);

    return {
      announcements,
      totalCount,
      currentPage:
        Math.floor(parseInt(params.skip) / parseInt(params.limit)) + 1,
      totalPages: Math.ceil(totalCount / parseInt(params.limit)),
      itemsPerPage: parseInt(params.limit),
    };
  },
  ["getAllAnnouncements"],
  {
    tags: ["announcements"],
  }
);

export async function createAnnouncement(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const title = formData.get("title") as string;
    const image = formData.get("image") as File;
    const content = formData.get("content") as string;

    if (!title) {
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
        folder: "/sis/announcements",
      });
      imgUrl = uploadResponse.url;
    }

    await prisma.announcement.create({
      data: {
        title,
        content,
        image: imgUrl,
        createdBy: session!.id,
        updatedBy: session!.id,
      },
    });

    revalidateTag("announcements");
  } catch (error) {
    console.error("Error creating announcement:", error);
    return {
      error: "Terjadi kesalahan saat menambahkan data pengumuman.",
    };
  }
  redirect(
    `/admin/announcements?success=1&message=Data pengumuman berhasil ditambahkan.`
  );
}

export async function updateAnnouncement(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const image = formData.get("image") as File;
    const content = formData.get("content") as string;

    if (!title) {
      return {
        error: "Nama kegiatan harus diisi.",
      };
    }

    const existingAnnouncement = await prisma.announcement.findUnique({
      where: { id },
    });

    if (!existingAnnouncement) {
      return {
        error: "Data pengumuman tidak ditemukan.",
      };
    }

    const session = await getSession();

    let imgUrl = existingAnnouncement.image;
    if (image && image.size > 0) {
      const logoArrayBuffer = await image.arrayBuffer();
      const logoBuffer = Buffer.from(logoArrayBuffer);
      const uploadResponse = await imagekit.upload({
        file: logoBuffer,
        fileName: `image-${Date.now()}.${image.name.split(".").pop()}`,
        folder: "/sis/announcements",
      });
      imgUrl = uploadResponse.url;
    }

    await prisma.announcement.update({
      where: {
        id,
      },
      data: {
        content,
        title,
        image: imgUrl,
        updatedBy: session!.id,
      },
    });

    revalidateTag("announcements");
  } catch (error) {
    console.error("Error updating announcement:", error);
    return {
      error: "Terjadi kesalahan saat memperbarui data pengumuman.",
    };
  }
  redirect(
    `/admin/announcements?success=1&message=Data pengumuman berhasil diperbarui.`
  );
}

export async function deleteAnnouncement(id: string) {
  try {
    const existingAnnouncement = await prisma.announcement.findUnique({
      where: { id },
    });

    if (!existingAnnouncement) {
      redirect(
        `/admin/announcements?error=1&message=Data pengumuman tidak ditemukan.`
      );
    }

    await prisma.announcement.delete({
      where: {
        id,
      },
    });

    revalidateTag("announcements");
  } catch (error) {
    console.error("Error deleting announcement:", error);
    redirect(
      `/admin/announcements?error=1&message=Terjadi kesalahan saat menghapus data pengumuman.`
    );
  }
  redirect(
    `/admin/announcements?success=1&message=Data pengumuman berhasil dihapus.`
  );
}

export async function getAnnouncementById(id: string) {
  const announcement = await prisma.announcement.findUnique({
    where: { id },
    include: {
      createdByAdmin: {
        select: {
          name: true,
          username: true,
        },
      },
      updatedByAdmin: {
        select: {
          name: true,
          username: true,
        },
      },
    },
  });

  return announcement;
}
