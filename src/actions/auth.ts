"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";

export async function login(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      return {
        error: "Semua field wajib diisi",
      };
    }

    const existingAdmin = await prisma.admin.findFirst({
      where: {
        username,
      },
    });

    if (!existingAdmin) {
      return {
        error: "Username tidak ditemukan",
      };
    }

    const passwordMatch = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!passwordMatch) {
      return {
        error: "Password salah",
      };
    }

    await createSession(existingAdmin.id, username);
  } catch (error) {
    console.log(error);
    return {
      error: "Terjadi kesalahan saat login",
    };
  }

  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
