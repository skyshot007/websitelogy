'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'li' | 'article' | 'header' | 'footer';
}

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Subtle entrance: 24px rise + opacity, only on first reveal. Respects
 * prefers-reduced-motion by rendering without animation.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggered reveal container. Use with <RevealItem> children.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return <div className={className}>{children}</div>;

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
