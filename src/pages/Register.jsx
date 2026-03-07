import React from 'react';
import logo from '../assets/logo.png';
import Button from '../components/ui/Button';
import AuthShell from '../components/ui/AuthShell';
import { FormField, TextArea, TextInput } from '../components/ui/FormField';

function Register() {
  return (
    <AuthShell logo={logo} title="Sindh Smart Citizen Portal" subtitle="Create Account">
      <form onSubmit={(e) => e.preventDefault()} className="mt-6">
        <FormField label="Full Name" htmlFor="full-name">
          <TextInput id="full-name" type="text" placeholder="e.g. Jane Doe" />
        </FormField>
        <FormField label="Email Address" htmlFor="email">
          <TextInput id="email" type="email" placeholder="e.g. janedoe@gmail.com" />
        </FormField>
        <FormField label="CNIC Number" htmlFor="cnic">
          <TextInput
            id="cnic"
            type="text"
            maxLength="15"
            pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}"
            placeholder="XXXXX-XXXXXXX-X"
          />
        </FormField>
        <FormField label="Phone Number" htmlFor="phone">
          <TextInput id="phone" type="text" placeholder="+92" />
        </FormField>
        <FormField label="Address" htmlFor="address">
          <TextArea id="address" placeholder="Enter your residential address" rows={3} />
        </FormField>
        <FormField label="Password" htmlFor="password">
          <TextInput id="password" type="password" placeholder="Enter your password" />
        </FormField>
        <FormField label="Confirm Password" htmlFor="confirm-password">
          <TextInput id="confirm-password" type="password" placeholder="Re-enter password" />
        </FormField>

        <Button type="submit" fullWidth size="lg">
          Register
        </Button>
      </form>
    </AuthShell>
  );
}

export default Register;
