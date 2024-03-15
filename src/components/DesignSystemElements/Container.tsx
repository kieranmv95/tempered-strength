import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge('px-4 py-12 container mx-auto', className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

export default Container;
