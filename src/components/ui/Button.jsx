import React from 'react';
import { cn } from './cn';

const variantClass = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  secondary: 'border border-surface-300 bg-white text-surface-800 hover:bg-surface-50',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700',
  muted: 'bg-surface-100 text-surface-700 hover:bg-surface-200',
};

const sizeClass = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-4 py-3 text-base',
};

function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        'cursor-pointer rounded-md font-semibold transition',
        variantClass[variant],
        sizeClass[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
