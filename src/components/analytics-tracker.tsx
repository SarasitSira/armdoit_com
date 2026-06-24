"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logPageVisit } from "@/actions/analytics";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      logPageVisit(pathname);
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}
