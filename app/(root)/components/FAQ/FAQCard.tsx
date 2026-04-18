import { RevealItem } from "@/components/anim/reveal-item";
import { faqItem } from "@/utils/types";
import { AnimatePresence, motion } from "motion/react";

type Props = faqItem & {
  open: number | null;
  setOpen: React.Dispatch<React.SetStateAction<number | null>>;
};

const FAQCard = ({ open, setOpen, id, headline, description }: Props) => {
  return (
    <RevealItem>
      <div
        className="overflow-hidden cursor-pointer border border-border px-6 rounded-xl hover:shadow-lg transition-all duration-300"
        onClick={() => setOpen((prev) => (prev === id ? null : id))}
      >
        <div className="flex gap-3 justify-between items-center">
          <h3 className="py-6 font-semiBold text-sm">{headline}</h3>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-down-icon lucide-chevron-down w-4 h-4"
            initial={{ rotate: 0 }}
            animate={open === id ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <path d="m6 9 6 6 6-6" />
          </motion.svg>
        </div>
        <AnimatePresence>
          {open === id && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className=""
            >
              <p className="text-sm pb-6">{description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RevealItem>
  );
};
export default FAQCard;
