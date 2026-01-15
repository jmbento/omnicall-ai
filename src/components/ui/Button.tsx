/**
 * Button - Premium Button Component
 * Multiple variants with smooth animations and loading states
 */

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
  success:
    'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white bg-gradient-to-r from-emerald-500 to-teal-500 border-none rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        disabled={isDisabled}
        className={cn(
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          isDisabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="shrink-0">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className="shrink-0">{icon}</span>
            )}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
