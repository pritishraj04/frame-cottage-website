"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CustomiseRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = searchParams.toString();
    router.replace(params ? `/customizer?${params}` : "/customizer");
  }, [router, searchParams]);

  return null;
}

export default function CustomisePage() {
  return (
    <Suspense fallback={null}>
      <CustomiseRedirect />
    </Suspense>
  );
}
