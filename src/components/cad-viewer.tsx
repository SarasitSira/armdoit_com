"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import model-viewer and bypass Server-Side Rendering
const ModelViewer = dynamic(
  () =>
    import("@google/model-viewer").then(() => {
      // The module defines the <model-viewer> custom element globally.
      // We return a React component that renders this element.
      return function Viewer(props: any) {
        // @ts-ignore
        return <model-viewer {...props}></model-viewer>;
      };
    }),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center font-mono text-xs text-muted-foreground">
        [INITIALIZING WEBGL ENVIRONMENT...]
      </div>
    )
  }
);

interface CadViewerProps {
  src: string;
  alt: string;
}

export function CadViewer({ src, alt }: CadViewerProps) {
  return (
    <div className="w-full h-full rounded-md overflow-hidden bg-gradient-to-tr from-muted to-background border border-border">
      <ModelViewer
        src={src}
        alt={alt}
        auto-rotate="true"
        camera-controls="true"
        shadow-intensity="1"
        environment-image="neutral"
        exposure="1"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
