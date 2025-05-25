import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            {
              // Variants
              'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-600':
                variant === 'primary',
              'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-600':
                variant === 'secondary',
              'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-400':
                variant === 'outline',
              'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400':
                variant === 'ghost',
              // Sizes
              'h-8 px-3 text-sm': size === 'sm',
              'h-10 px-4 text-base': size === 'md',
              'h-12 px-6 text-lg': size === 'lg',
            },
            className
          )
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;