import React from 'react';
import { cn } from './cn';

function Card({ children, className }) {
  return (
    <div className={cn('rounded-card border border-surface-200 bg-white shadow-card', className)}>
      {children}
    </div>
  );
}

export default Card;
