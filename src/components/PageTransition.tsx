import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

export const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      key={location.pathname}
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
