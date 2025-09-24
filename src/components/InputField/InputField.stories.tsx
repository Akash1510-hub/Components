import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <InputField {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    helperText: 'Type your full name',
    variant: 'outlined',
    size: 'md',
  },
};

export const EmailInvalid: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <InputField {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    invalid: true,
    errorMessage: 'Invalid email',
    variant: 'outlined',
    size: 'md',
  },
};

export const PasswordField: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <InputField {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    variant: 'filled',
    size: 'md',
    clearable: true,
  },
};

export const Disabled: Story = {
  render: (args) => <InputField {...args} />,
  args: {
    label: 'Disabled Input',
    placeholder: "Can't type here",
    disabled: true,
    variant: 'ghost',
    size: 'md',
  },
};
