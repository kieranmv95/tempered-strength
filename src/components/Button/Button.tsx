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
  theme?: 'green' | 'blue' | 'danger' | 'text-underline' | 'egwene';
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
  theme = 'egwene',
}: ButtonProps) => {
  const getTheme = () => {
    switch (theme) {
      case 'text-underline':
        return `block underline py-2 px-4  ${fullWidth ? 'w-full' : ''} ${className ? className : ''}`;
      case 'danger':
        return `block text-thom bg-${theme}-500 py-2 px-4 rounded-full ${fullWidth ? 'w-full' : ''} ${className ? className : ''}`;
      case 'egwene':
      default:
        return `block text-rand-500 bg-${theme}-500 py-2 px-4 rounded-full ${fullWidth ? 'w-full' : ''} ${className ? className : ''}`;
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={getTheme()}
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
};

export default Button;
