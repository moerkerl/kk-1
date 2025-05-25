import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'interactive' | 'elevated';
  padding?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          'rounded-lg bg-white',
          padding || 'p-6',
          variant === 'default' && 'shadow',
          variant === 'bordered' && 'border border-gray-200',
          variant === 'interactive' && 'shadow hover:shadow-lg transition-shadow cursor-pointer',
          variant === 'elevated' && 'shadow-lg',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge('mb-4 pb-4 border-b border-gray-100', className)}
        {...props}
      />
    );
  }
);

CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={twMerge('text-lg font-semibold text-gray-900', className)}
        {...props}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={twMerge('text-gray-600', className)} {...props} />;
  }
);

CardContent.displayName = 'CardContent';

export default Card;
export { Card, CardHeader, CardTitle, CardContent };