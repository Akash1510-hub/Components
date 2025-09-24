import React, { useState } from 'react';

interface InputFieldProps {
  value?: string;
  onChange?: (e: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  type?: string;
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = 'outlined',
  size = 'md',
  clearable = false,
  type = 'text',
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  const baseClasses =
    'w-full rounded-md focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = {
    filled:
      'bg-gray-100 dark:bg-gray-700 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-400',
    outlined:
      'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400',
    ghost: 'bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400',
  };
  const errorClasses = invalid
    ? 'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400'
    : '';
  const rightPadding =
    clearable && type === 'password'
      ? 'pr-16'
      : clearable || type === 'password'
      ? 'pr-10'
      : 'pr-3';

  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-gray-700 dark:text-gray-200 font-medium">{label}</label>}
      <div className="relative">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${errorClasses} ${rightPadding} focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400`}
        />
        {clearable && internalValue && !disabled && (
          <button
            onClick={() => {
              setInternalValue('');
              onChange && onChange('');
            }}
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        )}
        {type === 'password' && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className={`absolute ${clearable ? 'right-10' : 'right-2'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors`}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
      </div>
      {helperText && !invalid && (
        <span className="text-gray-500 dark:text-gray-400 text-sm">{helperText}</span>
      )}
      {invalid && errorMessage && (
        <span className="flex items-center text-red-500 dark:text-red-400 text-sm space-x-1">
          <span>⚠️</span>
          <span>{errorMessage}</span>
        </span>
      )}
    </div>
  );
};

export default InputField;
