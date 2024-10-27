import { Variants } from "framer-motion";

export const SidebarVariants: Variants = {
  hidden: {
    x: -50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 3,
    },
  },
};

export const MenuVariants: Variants = {
  hidden: {
    y: -50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 3,
    },
  },
};

export const ActionVariants: Variants = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 3,
    },
  },
};

export const PreviewVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 3,
    },
  },
};

export const LoaderVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};
