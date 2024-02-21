import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

type ButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
};
const Button = ({ disabled, loading, children }: ButtonProps) => (
  <button
    type="submit"
    disabled={disabled}
    className="w-full block bg-green-600 hover:bg-green-700 click:bg-green-600 py-2 px-4 rounded"
  >
    {loading ? (
      <div className="inline-flex gap-2 items-center">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin w-4 h-4" />
        Loading...
      </div>
    ) : (
      children
    )}
  </button>
);

export default Button;
