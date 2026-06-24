"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createExperience(formData: FormData) {
  const role = formData.get("role") as string;
  const company = formData.get("company") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const description = formData.get("description") as string;

  await prisma.experience.create({
    data: {
      role,
      company,
      startDate,
      endDate: endDate || null,
      description,
    },
  });

  revalidatePath("/admin/experiences");
  revalidatePath("/experiences");
  redirect("/admin/experiences");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({
    where: { id },
  });
  revalidatePath("/admin/experiences");
  revalidatePath("/experiences");
}

export async function updateExperience(id: string, formData: FormData) {
  const role = formData.get("role") as string;
  const company = formData.get("company") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const description = formData.get("description") as string;

  await prisma.experience.update({
    where: { id },
    data: {
      role,
      company,
      startDate,
      endDate: endDate || null,
      description,
    },
  });

  revalidatePath("/admin/experiences");
  revalidatePath("/experiences");
  redirect("/admin/experiences");
}
