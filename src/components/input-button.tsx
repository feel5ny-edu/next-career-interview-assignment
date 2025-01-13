import React, { forwardRef } from 'react';

interface InputWithButtonProps {
  children: React.ReactNode;
  className?: string;
  dataTestId?: string;
}

interface InputProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  dataTestId?: string;
}

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  dataTestId?: string;
}

export const InputWithButton = ({
  children,
  className = '',
  dataTestId,
}: InputWithButtonProps) => {
  return (
    <div className={`flex items-center ${className}`} data-testid={dataTestId}>
      {children}
    </div>
  );
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder = 'Type here...', onChange, className = '', dataTestId },
    ref
  ) => {
    return (
      <input
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
        className={`flex-1 rounded-lg border p-4 ${className}`}
        data-testid={dataTestId}
      />
    );
  }
);

const Button = ({
  disabled = false,
  onClick,
  className = '',
  children,
  dataTestId,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      data-testid={dataTestId}
      className={`min-w-28 ml-2 rounded-lg px-8 py-4 bg-blue-600 disabled:bg-blue-400 text-white ${className}`}
    >
      {children}
    </button>
  );
};

// Compound Components를 InputWithButton에 추가
InputWithButton.Input = Input;
InputWithButton.Button = Button;
