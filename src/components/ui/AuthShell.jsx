import React from 'react';
import { cn } from './cn';

function AuthShell({ logo, title, subtitle, children, className }) {
  return (
    <div className={cn('mx-auto my-8 max-w-[450px] rounded-card bg-gradient-to-br from-auth-start to-auth-end p-10 text-white shadow-lg', className)}>
      <img
        className="mx-auto mb-1 block h-[150px] w-[150px] rounded-full border border-brand-200 object-cover shadow-sm"
        src={logo}
        alt="SSCP logo"
      />
      <h1 className="text-center font-display text-2xl font-bold">{title}</h1>
      <h2 className="text-center font-display text-xl font-bold">{subtitle}</h2>
      {children}
    </div>
  );
}

export default AuthShell;
