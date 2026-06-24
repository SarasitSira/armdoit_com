"use client";

import { uploadResume } from "@/actions/resume";
import { useState } from "react";
import { FileUp, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminResumePage() {
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleUpload(formData: FormData) {
    setStatus("uploading");
    setMessage("");

    try {
      const result = await uploadResume(formData);
      if (result.success) {
        setStatus("success");
        setMessage(result.message);
      } else {
        setStatus("error");
        setMessage(result.message);
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "An unexpected error occurred");
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">Resume Configuration</h1>
        <p className="text-muted-foreground font-mono text-sm">Upload your latest PDF resume to sync it across the site.</p>
      </div>

      <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-md font-mono text-sm">
        <h4 className="font-bold uppercase tracking-widest mb-1 flex items-center gap-2"><AlertCircle className="w-4 h-4"/> [DEPLOYMENT_WARNING]</h4>
        This uploader saves the file to your local `public/resume.pdf` folder. If you deploy this to a serverless host like Vercel, this file will reset on every deployment. You will need to migrate to Vercel Blob storage for production.
      </div>

      <form action={handleUpload} className="bg-card border border-border p-8 rounded-lg space-y-6">
        <div className="space-y-4">
          <label className="block font-mono text-sm uppercase tracking-widest text-muted-foreground">Select PDF File</label>
          
          <div className="flex items-center justify-center w-full">
            <label htmlFor="resume" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileUp className="w-10 h-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground font-mono"><span className="font-bold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-muted-foreground font-mono">PDF ONLY (MAX. 50MB)</p>
              </div>
              <input id="resume" name="resume" type="file" accept="application/pdf" className="hidden" required />
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={status === "uploading"}
          className="w-full bg-primary text-primary-foreground py-3 rounded-md font-mono text-sm tracking-widest font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "uploading" ? "[UPLOADING...]" : "[SYNC RESUME]"}
        </button>

        {status === "success" && (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-mono text-sm font-bold bg-green-500/10 p-3 rounded-md">
            <CheckCircle className="w-4 h-4" /> {message}
          </div>
        )}
        
        {status === "error" && (
          <div className="flex items-center gap-2 text-destructive font-mono text-sm font-bold bg-destructive/10 p-3 rounded-md">
            <AlertCircle className="w-4 h-4" /> {message}
          </div>
        )}
      </form>
    </div>
  );
}
