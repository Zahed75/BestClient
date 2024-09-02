"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const PageTransition = ({ children }) => {
  const router = useRouter();
  const variants = {
    hidden: { opacity: 0, y: 200 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -200 },
  };

  return (
    <motion.div
      key={router.pathname}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: "linear", duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
