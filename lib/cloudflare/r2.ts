import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || "your-cloudflare-account-id";
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "your-r2-access-key-id";
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "your-r2-secret-access-key";
const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || "frames-cottage-images";
const customDomain = process.env.CLOUDFLARE_PUBLIC_CUSTOM_DOMAIN || "https://images.frames-cottage.com";

export function isR2Configured(): boolean {
  if (!accountId || !accessKeyId || !secretAccessKey) return false;
  if (
    accountId.includes("your-") ||
    accessKeyId.includes("your-") ||
    secretAccessKey.includes("your-")
  ) {
    return false;
  }
  return true;
}

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export function getR2PublicUrl(key: string): string {
  const cleanDomain = customDomain.replace(/\/+$/, "");
  const cleanKey = key.replace(/^\/+/, "");
  return `${cleanDomain}/${cleanKey}`;
}

export async function uploadFileToR2(
  buffer: Buffer | Uint8Array,
  key: string,
  contentType: string = "application/octet-stream"
): Promise<{ success: boolean; url: string; key: string; error?: string }> {
  const publicUrl = getR2PublicUrl(key);

  if (!isR2Configured()) {
    console.log(`[Cloudflare R2 Mock] Simulating upload for key: ${key} (${contentType}, ${buffer.length} bytes)`);
    return {
      success: true,
      url: publicUrl,
      key,
    };
  }

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    await r2Client.send(command);

    return {
      success: true,
      url: publicUrl,
      key,
    };
  } catch (error: any) {
    console.error("[Cloudflare R2 Error]:", error);
    return {
      success: false,
      url: publicUrl,
      key,
      error: error?.message || "Failed to upload file to Cloudflare R2",
    };
  }
}
