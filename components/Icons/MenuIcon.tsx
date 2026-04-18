import { AnimatePresence, motion } from "framer-motion";

const MenuIcon = ({ open }: { open: boolean }) => {
  return (
    <motion.svg
      width="20"
      height="17"
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.line
        x1="1.5"
        y1="1.5"
        x2="18.5"
        y2="1.5"
        stroke="black"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ y: 0, rotate: 0 }}
        animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
      />
      <motion.line
        x1="1.5"
        y1="8.5"
        x2="18.5"
        y2="8.5"
        stroke="black"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ opacity: 1 }}
        animate={open ? { opacity: 0 } : { opacity: 1 }}
      />
      <motion.line
        x1="1.5"
        y1="15.5"
        x2="18.5"
        y2="15.5"
        stroke="black"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ y: 0, rotate: 0 }}
        animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
      />
    </motion.svg>
  );
};
export default MenuIcon;
