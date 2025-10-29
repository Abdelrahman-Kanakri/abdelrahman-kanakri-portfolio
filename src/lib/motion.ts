/**
 * GPU-Accelerated Motion Variants
 * Centralized Framer Motion animation presets for consistent, performant animations
 */

import { Variants } from "framer-motion";

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Slide animations
export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Stagger children animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

// Card hover (GPU-accelerated)
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -4,
    transition: { 
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

// Dialog/Modal animations
export const dialogOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.15 }
  }
};

export const dialogContent: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: -10
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.2,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    y: 10,
    transition: { 
      duration: 0.15,
      ease: "easeIn"
    }
  }
};

// Dropdown/Popover animations
export const dropdownContent: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: -5
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.15,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { 
      duration: 0.1
    }
  }
};

// Tap feedback (for buttons and interactive elements)
export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.1 }
};

// Smooth easing presets
export const easing = {
  easeOut: [0.4, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: { type: "spring", stiffness: 300, damping: 30 }
} as const;
