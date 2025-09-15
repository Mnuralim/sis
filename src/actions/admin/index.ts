"use server";

import prisma from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";
import { getSession } from "../session";
import { compare, hash } from "bcryptjs";
import { redirect } from "next/navigation";

export const getAdmin = unstable_cache(
  async function getAdmin(id: string) {
    return prisma.admin.findUnique({
      where: {
        id,
      },
    });
  },
  ["getAdmin"],
  {
    tags: ["admin"],
  }
);

export async function updateAdmin(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const oldPassword = formData.get("oldPassword") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const name = formData.get("name") as string;

  if (!name) {
    return {
      error: "Nama harus diisi",
    };
  }

  try {
    const session = await getSession();
    const existingAdmin = await getAdmin(session!.id);
    if (!existingAdmin) {
      return {
        error: "Admin tidak ditemukan",
      };
    }

    let currentPassword = existingAdmin.password;

    if (oldPassword && password && confirmPassword) {
      const passwordMatch = await compare(oldPassword, existingAdmin.password);

      if (!passwordMatch) {
        return {
          error: "Password lama salah",
        };
      }

      if (password.length < 6) {
        return {
          error: "Password harus memiliki minimal 6 karakter",
        };
      }

      if (password !== confirmPassword) {
        return {
          error: "Password dan Konfirmasi Password harus sama",
        };
      }

      currentPassword = await hash(password, 10);
    }

    await prisma.admin.update({
      where: {
        id: existingAdmin.id,
      },
      data: {
        password: currentPassword,
        name,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: "Something went wrong",
      };
    }
  }

  revalidateTag("admin");
  redirect("/admin/settings?success=1&message=Profil berhasil diperbarui");
}
