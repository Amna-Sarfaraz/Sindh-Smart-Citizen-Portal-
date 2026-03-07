import React from 'react';
import { mockData } from '../mockData';
import logo from '../assets/logo.png';
import Button from '../components/ui/Button';
import AuthShell from '../components/ui/AuthShell';
import { FormField, TextInput } from '../components/ui/FormField';

function Login() {
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
          <TextInput id="password" type="password" placeholder="********" />
        </FormField>
        <Button type="submit" fullWidth size="lg">
          Login
        </Button>
      </form>
      <p className="mt-4 text-white">
        Don&apos;t have an account?{' '}
        <a href="/register" className="text-brand-200 underline">Register here</a>
      </p>
    </AuthShell>
  );
}

export default Login;
