"use server";

import { revalidatePath } from "next/cache";
import { writeFile } from "fs/promises";
import path from "path";

export async function uploadResume(formData: FormData) {
  const file = formData.get("resume") as File;
  
  if (!file) {
    throw new Error("No file uploaded");
  }

  // Ensure it's a PDF
  if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
    throw new Error("Only PDF files are allowed");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Write to public directory
  const filePath = path.join(process.cwd(), "public", "resume.pdf");
  
  try {
    await writeFile(filePath, buffer);
    revalidatePath("/about");
    return { success: true, message: "Resume updated successfully" };
  } catch (error) {
    console.error("Error writing resume file:", error);
    return { success: false, message: "Failed to save resume" };
  }
}
