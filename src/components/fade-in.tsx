"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.25, 0.25, 0, 1], // Custom cubic-bezier for a smooth, premium feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
