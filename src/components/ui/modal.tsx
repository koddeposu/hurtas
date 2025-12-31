import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface OverlayProps {
  isShow: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
}


const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 30,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};


export function Modal({
  isShow,
  onClose,
  children,
}: OverlayProps) {

  useEffect(() => {
    if (isShow) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isShow]);

  return (
    <AnimatePresence>
      {isShow && (
        <motion.main
          className="fixed inset-0 z-50 flex flex-col"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="bg-black/80 fixed inset-0 -z-10"
            variants={backdropVariants}
          />
          <motion.div
            className="bg-primary/30 fixed inset-0 -z-20 blur-[6px]"
            variants={backdropVariants}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full h-full"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {onClose && (
              <button
                onClick={onClose}
                className="bg-white w-10 h-10 absolute right-5 top-5 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 duration-200 z-50"
              >
                <X size={28} className="text-primary" />
              </button>
            )}

            {children}
          </motion.div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
