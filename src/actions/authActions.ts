"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { requireAuth } from "@/lib/requireAuth";

export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  await requireAuth();

  try {
    await auth.api.changePassword({
      body: {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: true,
      },
      headers: await headers(),
    });

    return { success: true };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Şifre değiştirilirken bir hata oluştu";

    return { success: false, error: errorMessage };
  }
}
