/**
 * Input - Premium Input Component
 * Glass-styled input with icons and validation states
 */

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      icon,
      iconPosition = 'left',
      fullWidth = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substring(7)}`;
    const hasIcon = Boolean(icon);

    return (
      <div className={cn('flex flex-col gap-2', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-bold uppercase tracking-widest text-slate-400"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {hasIcon && iconPosition === 'left' && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'input-glass',
              hasIcon && iconPosition === 'left' && 'pl-12',
              hasIcon && iconPosition === 'right' && 'pr-12',
              error && 'border-red-500/50 focus:border-red-500',
              className
            )}
            {...props}
          />
          {hasIcon && iconPosition === 'right' && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs font-medium text-red-400">{error}</span>
        )}
        {hint && !error && (
          <span className="text-xs font-medium text-slate-500">{hint}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
