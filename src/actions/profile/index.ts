"use server";

import { imagekit } from "@/lib/imagekit";
import prisma from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";
import { getSession } from "../session";
import { redirect } from "next/navigation";

export const getProfile = unstable_cache(
  async function getProfile() {
    const profile = await prisma.profile.findFirst();
    return profile;
  },
  ["getProfile"],
  {
    tags: ["profile"],
  }
);

export async function updateProfile(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const schoolName = formData.get("schoolName") as string;
    const address = formData.get("address") as string;
    const description = formData.get("description") as string;
    const accreditation = formData.get("accreditation") as string;
    const contact = formData.get("contact") as string;
    const history = formData.get("history") as string;
    const vision = formData.get("vision") as string;
    const mission = formData.get("mission") as string;
    const logo = formData.get("logo") as File;

    if (
      !schoolName ||
      !address ||
      !description ||
      !accreditation ||
      !contact ||
      !history ||
      !vision ||
      !mission
    ) {
      return {
        error: "Semua field harus diisi.",
      };
    }

    const session = await getSession();

    const existingProfile = await prisma.profile.findFirst();
    if (existingProfile) {
      let logoUrl = existingProfile.logo;
      if (logo && logo.size > 0) {
        const logoArrayBuffer = await logo.arrayBuffer();
        const logoBuffer = Buffer.from(logoArrayBuffer);
        const uploadResponse = await imagekit.upload({
          file: logoBuffer,
          fileName: `logo-${Date.now()}.${logo.name.split(".").pop()}`,
          folder: "/sis/logo",
        });
        logoUrl = uploadResponse.url;
      }

      await prisma.profile.update({
        where: {
          id: existingProfile.id,
        },
        data: {
          accreditation,
          address,
          contact,
          description,
          history,
          mission,
          vision,
          schoolName,
          logo: logoUrl,
          updatedAt: new Date(),
          updatedBy: session?.id,
        },
      });
    } else {
      let logoUrl = "";
      if (logo && logo.size > 0) {
        const logoArrayBuffer = await logo.arrayBuffer();
        const logoBuffer = Buffer.from(logoArrayBuffer);
        const uploadResponse = await imagekit.upload({
          file: logoBuffer,
          fileName: `logo-${Date.now()}.${logo.name.split(".").pop()}`,
          folder: "/sis/logo",
        });
        logoUrl = uploadResponse.url;
      } else {
        return {
          error: "Logo harus diunggah.",
        };
      }

      await prisma.profile.create({
        data: {
          accreditation,
          address,
          contact,
          description,
          history,
          mission,
          schoolName,
          vision,
          createdBy: session!.id,
          logo: logoUrl,
          updatedBy: session!.id,
        },
      });
    }

    revalidateTag("profile");
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      error: "Kesalahan sistem, silakan coba lagi.",
    };
  }

  redirect(
    `/admin/profile?message=Profil berhasil diperbarui&alertType=success`
  );
}
