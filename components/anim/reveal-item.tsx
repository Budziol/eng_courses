"use client";

import { motion } from "framer-motion";

export function RevealItem({
  children,
  y = 20,
}: {
  children: any;
  y?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: y,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
