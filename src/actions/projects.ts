"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import path from "path";

// Helper function to save files to the public directory
async function saveFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0 || file.name === "undefined") return null;
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const filePath = path.join(process.cwd(), "public", "uploads", fileName);
  
  await writeFile(filePath, buffer);
  return `/uploads/${fileName}`;
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const tags = formData.get("tags") as string;
  
  const imageFile = formData.get("imageFile") as File | null;
  const cadFile = formData.get("cadFile") as File | null;

  const imageUrl = await saveFile(imageFile);
  const cadModelUrl = await saveFile(cadFile);

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  await prisma.project.create({
    data: {
      title,
      slug,
      description,
      content,
      tags,
      image: imageUrl,
      cadModelUrl: cadModelUrl,
      published: true, // Auto-publish for now
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id },
  });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const tags = formData.get("tags") as string;
  
  const imageFile = formData.get("imageFile") as File | null;
  const cadFile = formData.get("cadFile") as File | null;

  const newImageUrl = await saveFile(imageFile);
  const newCadModelUrl = await saveFile(cadFile);

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  // Only update file URLs if new files were actually uploaded
  const updateData: any = {
    title,
    slug,
    description,
    content,
    tags,
  };

  if (newImageUrl) updateData.image = newImageUrl;
  if (newCadModelUrl) updateData.cadModelUrl = newCadModelUrl;

  await prisma.project.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  redirect("/admin/projects");
}
