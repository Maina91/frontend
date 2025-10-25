import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

export const GlobalLoader = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isVisible = isFetching > 0 || isMutating > 0;

  const hidden = { opacity: 0, scaleY: 0 };
  const visible = { opacity: 1, scaleY: 1, transition: { duration: 0.25 } };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 w-full h-[3px] z-[99] origin-left bg-gradient-to-r from-primary/70 via-primary to-primary/90 shadow-[0_0_8px_theme(colors.primary/50)]"
          initial="hidden"
          animate="visible"
          variants={{ hidden, visible }}
          exit={{
            opacity: 0,
            scaleY: 0,
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full w-1/3 bg-white/60 shadow-[0_0_15px_rgba(255,255,255,1),0_0_30px_rgba(255,255,255,0.8),0_0_60px_rgba(255,255,255,0.4)] rounded-full"
            animate="swing"
            variants={{
              swing: {
                x: ["300%", "-100%"],
                opacity: [1, 0.7, 1],
                transition: {
                  ease: "easeInOut",
                  duration: 1.3,
                  repeat: Infinity,
                  repeatType: "mirror",
                },
              },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
