import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

type ButtonProps = {
  type: 'submit' | 'button';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => any;
  fullWidth?: boolean;
  className?: string;
  loadingText?: string;
  theme?: 'green' | 'blue' | 'red';
};
const Button = ({
  type,
  disabled,
  loading,
  children,
  onClick,
  fullWidth,
  className,
  loadingText = 'Loading...',
  theme = 'green',
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    className={`block bg-${theme}-600 hover:bg-${theme}-700 click:bg-${theme}-600 py-2 px-4 rounded ${fullWidth ? 'w-full' : ''} ${className ? className : ''}`}
    onClick={onClick && onClick}
  >
    {loading ? (
      <div className="inline-flex gap-2 items-center">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin w-4 h-4" />
        {loadingText}
      </div>
    ) : (
      children
    )}
  </button>
);

export default Button;
