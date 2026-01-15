/**
 * Card - Premium Card Component
 * Versatile card with multiple variants and interactive states
 */

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'interactive' | 'active' | 'outline';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  variant?: CardVariant;
  noPadding?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'card',
  interactive: 'card card-interactive',
  active: 'card card-active',
  outline: 'bg-transparent border border-white/10 rounded-2xl',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', noPadding = false, className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          variantStyles[variant],
          noPadding && 'p-0',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

// Card Header Sub-component
interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  icon,
  action,
  className,
}) => (
  <div className={cn('flex items-center justify-between mb-4', className)}>
    <div className="flex items-center gap-3">
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-base font-bold text-white">{title}</h3>
        {subtitle && (
          <p className="text-xs text-slate-500 font-medium">{subtitle}</p>
        )}
      </div>
    </div>
    {action && <div>{action}</div>}
  </div>
);

// Card Content Sub-component
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
}) => <div className={cn('', className)}>{children}</div>;

// Card Footer Sub-component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      'mt-4 pt-4 border-t border-white/5 flex items-center justify-end gap-3',
      className
    )}
  >
    {children}
  </div>
);

export default Card;
