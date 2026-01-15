/**
 * GlassContainer - Premium Glassmorphism Container
 * Apple-level frosted glass effect with dynamic variants
 */

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type GlassVariant = 'default' | 'subtle' | 'elevated' | 'card' | 'solid';

interface GlassContainerProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  variant?: GlassVariant;
  glow?: boolean;
  hoverEffect?: boolean;
  noPadding?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<GlassVariant, string> = {
  default: 'glass',
  subtle: 'glass-subtle',
  elevated: 'glass-elevated',
  card: 'glass-card',
  solid: 'bg-slate-900/80 border border-white/10',
};

export const GlassContainer = forwardRef<HTMLDivElement, GlassContainerProps>(
  (
    {
      variant = 'default',
      glow = false,
      hoverEffect = false,
      noPadding = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-300',
          variantStyles[variant],
          glow && 'shadow-[0_0_40px_var(--color-brand-primary)/0.2]',
          hoverEffect && 'hover:scale-[1.02] hover:shadow-xl cursor-pointer',
          !noPadding && 'p-6',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassContainer.displayName = 'GlassContainer';

export default GlassContainer;
