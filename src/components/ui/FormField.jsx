import React from 'react';
import { cn } from './cn';

export function FormField({ label, htmlFor, className, labelClassName, children }) {
  return (
    <div className={cn('mb-9', className)}>
      <label htmlFor={htmlFor} className={cn('mb-2 block text-sm font-semibold', labelClassName)}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function TextInput({ className, ...props }) {
  return (
    <input
      className={cn(
        'w-full rounded-md border border-surface-300 bg-white px-3 py-3 text-surface-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200',
        className,
      )}
      {...props}
    />
  );
}

export function TextArea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'w-full rounded-md border border-surface-300 bg-white px-3 py-3 text-surface-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200',
        className,
      )}
      {...props}
    />
  );
}

export function SelectInput({ className, children, ...props }) {
  return (
    <select
      className={cn(
        'w-full rounded-md border border-surface-300 bg-white px-3 py-2 text-surface-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
