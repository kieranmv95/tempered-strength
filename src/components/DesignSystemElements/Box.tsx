import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  small?: boolean;
  children: React.ReactNode;
};

const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, className, small = false, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          'bg-rand-400 rounded-xl p-4 md:p-6',
          small && 'md:p-4',
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

export default Box;
