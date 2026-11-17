import { NextRequest, NextResponse } from "next/server";
import { uploadFileToR2 } from "@/lib/cloudflare/r2";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided in form-data ('file')" },
        { status: 400 }
      );
    }

    const filename = file.name || "unnamed_attachment";
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const size = buffer.length;
    const contentType = file.type || "application/octet-stream";

    // Generate safe storage key
    const timestamp = Date.now();
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key = `uploads/${timestamp}_${sanitizedFilename}`;

    const uploadResult = await uploadFileToR2(buffer, key, contentType);

    if (!uploadResult.success && uploadResult.error) {
      return NextResponse.json(
        { success: false, error: uploadResult.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: uploadResult.url,
      filename,
      size,
      key,
      contentType,
    });
  } catch (error: any) {
    console.error("Upload API Route Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "File upload failed" },
      { status: 500 }
    );
  }
}
