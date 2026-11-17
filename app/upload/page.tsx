"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function UploadRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.has("step")) {
      params.set("step", "artwork");
    }
    router.replace(`/customizer?${params.toString()}`);
  }, [router, searchParams]);

  return null;
}

export default function UploadPage() {
  return (
    <Suspense fallback={null}>
      <UploadRedirect />
    </Suspense>
  );
}
