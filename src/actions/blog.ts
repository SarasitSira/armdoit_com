"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  await prisma.blog.create({
    data: {
      title,
      slug,
      content,
      category,
      published: true, // Auto-publish for now
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deleteBlog(id: string) {
  await prisma.blog.delete({
    where: { id },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function updateBlog(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  await prisma.blog.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      category,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/blog");
}
