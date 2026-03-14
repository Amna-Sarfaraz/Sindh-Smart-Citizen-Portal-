import React, { useState } from 'react';
import { mockData } from '../mockData';
import logo from '../assets/logo.png';
import Button from '../components/ui/Button';
import AuthShell from '../components/ui/AuthShell';
import { FormField, TextInput } from '../components/ui/FormField';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthShell logo={logo} title="Sindh Smart Citizen Portal" subtitle="Login">
      <form onSubmit={(e) => e.preventDefault()} className="mt-6">
        <FormField label="CNIC Number" htmlFor="cnic">
          <TextInput
            id="cnic"
            type="text"
            maxLength="15"
            pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}"
            placeholder="XXXXX-XXXXXXX-X"
            defaultValue={mockData.currentUser.cnic}
            required
          />
        </FormField>
        <FormField label="Password" htmlFor="password">
          <div className="relative">
            <TextInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              className="pr-11"
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 transition hover:text-surface-800"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3l18 18" />
                  <path d="M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5" />
                  <path d="M9.9 5.1A10.5 10.5 0 0 1 12 5c5 0 9.3 3.1 11 7-0.6 1.4-1.5 2.7-2.6 3.7" />
                  <path d="M6.2 6.2C4 7.5 2.3 9.5 1 12c1.7 3.9 6 7 11 7 1.2 0 2.4-0.2 3.4-0.6" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </FormField>
        <Button type="submit" fullWidth size="lg">
          Login
        </Button>
      </form>
      <p className="mt-4 text-white">
        Don&apos;t have an account?{' '}
        <a href="/register" className="text-brand-200 underline">Register here</a>
      </p>
      <p className="mt-3 text-white">
        <a href="/" className="text-brand-200 underline">Go back to home</a>
      </p>
    </AuthShell>
  );
}

export default Login;
