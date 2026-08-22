// Reusable Framer Motion variants. Kept centralized so motion language stays consistent.

const easeOut = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const slideLeft = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 16 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const rotateIn = {
  hidden: { opacity: 0, rotate: -4, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const magnifyIn = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

// Letter / word stagger — pass this as the per-child variant and use a parent
// staggerContainer with stagger ~0.025–0.04.
export const letterRise = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const wordRise = {
  hidden: { opacity: 0, y: 24, rotateX: -25 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const floatY = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: [0, -6, 0],
    transition: {
      opacity: { duration: 0.6, ease: easeOut },
      y: {
        duration: 6,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror',
      },
    },
  },
};

export const revealScale = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

// Subtle continuous tilt (for hero photo card etc.).
// Apply as `animate` (not "visible") so it loops forever.
export const tiltLoop = (rotateAmount = 1.4) => ({
  rotate: [-rotateAmount, rotateAmount, -rotateAmount],
  transition: {
    duration: 9,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'mirror',
  },
});

// Gentle horizontal drift (for atmospheric orbs / decorative elements).
export const driftX = (amount = 16) => ({
  x: [-amount, amount, -amount],
  transition: {
    duration: 14,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'mirror',
  },
});

// Page transition (fade + slight Y)
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: 'easeIn' } },
};

// Hover micro-interactions
export const hoverLift = {
  rest: { y: 0, boxShadow: '0 1px 0 rgba(17,19,24,0.04)' },
  hover: {
    y: -4,
    boxShadow: '0 18px 40px -18px rgba(17,19,24,0.18)',
    transition: { duration: 0.35, ease: easeOut },
  },
};