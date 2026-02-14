/**
 * Reusable Framer Motion animation variants and utilities
 * for consistent animations across all pages
 */

// ============================================================================
// SECTION ENTRY ANIMATIONS
// ============================================================================

export const fadeInUpVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40 },
};

export const fadeInUpTransition = {
  duration: 0.6,
  ease: "easeOut",
};

export const sectionContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// ============================================================================
// LIST ITEM STAGGER ANIMATIONS
// ============================================================================

export const staggerContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

export const staggerItemVariants = {
  initial: { opacity: 0, y: 20, rotate: -5 },
  animate: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  },
};

// Alternative stagger without rotation
export const staggerItemSimpleVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// ============================================================================
// CARD ANIMATIONS
// ============================================================================

export const cardHoverVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.05,
    y: -8,
    transition: {
      duration: 0.3,
      type: "tween",
      ease: "easeOut",
    },
  },
};

export const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// ============================================================================
// TIMELINE PROCESS ANIMATIONS
// ============================================================================

export const timelineStepVariants = (index: number) => ({
  initial: { opacity: 0, x: index % 2 === 0 ? -40 : 40, rotate: index % 2 === 0 ? -3 : 3 },
  animate: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.15,
      type: "spring",
      stiffness: 100,
    },
  },
});

export const timelineConnectorVariants = (index: number) => ({
  initial: { scaleY: 0, opacity: 0 },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: index * 0.15 + 0.2,
      ease: "easeOut",
    },
  },
});

export const timelineNumberVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 120,
    },
  },
};

// ============================================================================
// REVEAL ANIMATIONS
// ============================================================================

export const scaleRevealVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const bounceInVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.1, 1],
    opacity: 1,
    transition: {
      duration: 0.6,
      times: [0, 0.6, 1],
      ease: "easeOut",
    },
  },
};

// ============================================================================
// CONTENT REVEAL ANIMATIONS
// ============================================================================

export const slideInLeftVariants = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const slideInRightVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

// ============================================================================
// INTERSECTION OBSERVER OPTIONS (FOR SCROLL TRIGGERS)
// ============================================================================

export const scrollTriggerOptions = {
  once: true,
  amount: "some" as const,
  margin: "-100px" as const,
};

export const scrollTriggerFullViewOptions = {
  once: true,
  amount: "all" as const,
  margin: "-50px" as const,
};

// ============================================================================
// VIEWPORT-BASED ANIMATIONS
// ============================================================================

export const viewportVariants = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, margin: "-100px" },
};

// ============================================================================
// BUTTON & INTERACTIVE ANIMATIONS
// ============================================================================

export const buttonHoverVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export const iconRotateVariants = {
  initial: { rotate: 0 },
  hover: { rotate: 360 },
  transition: { duration: 0.6, ease: "easeInOut" },
};

// ============================================================================
// TEXT ANIMATIONS
// ============================================================================

export const textRevealVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const textGradientVariants = {
  initial: { backgroundPosition: "200% center" },
  animate: {
    backgroundPosition: "0% center",
    transition: {
      duration: 8,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

// ============================================================================
// TAB & ACCORDION ANIMATIONS
// ============================================================================

export const tabContentVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 },
};

export const expandableCardVariants = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3 },
};

// ============================================================================
// HERO SECTION ANIMATIONS
// ============================================================================

export const heroTitleVariants = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export const heroSubtitleVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.15,
      ease: "easeOut",
    },
  },
};

export const heroButtonsVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3,
      ease: "easeOut",
    },
  },
};

// ============================================================================
// BACKDROP ANIMATIONS
// ============================================================================

export const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

// ============================================================================
// CUSTOM HOOK FOR REDUCED MOTION SUPPORT
// ============================================================================

export const useReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get safe animation variants that respect reduced motion preference
 */
export const getSafeAnimationVariants = (variants: any, reducedMotionVariants: any) => {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? reducedMotionVariants : variants;
};

/**
 * Create reduced motion variants (instant or simple fade)
 */
export const createReducedMotionVariants = (showVariant: any) => ({
  initial: { ...showVariant.initial, transition: { duration: 0 } },
  animate: { ...showVariant.animate, transition: { duration: 0 } },
  exit: { ...showVariant.exit, transition: { duration: 0 } },
});
