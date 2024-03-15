import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type TitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
};

const Title = forwardRef<HTMLDivElement, TitleProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge('text-2xl font-bold lg:text-4xl', className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Title.displayName = 'Title';

export default Title;
