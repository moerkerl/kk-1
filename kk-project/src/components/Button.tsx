import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, leftIcon, rightIcon, isLoading, children, ...props }, ref) => {
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
              'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600':
                variant === 'danger',
              // Sizes
              'h-8 px-3 text-sm': size === 'sm',
              'h-10 px-4 text-base': size === 'md',
              'h-12 px-6 text-lg': size === 'lg',
              // Full width
              'w-full': fullWidth,
            },
            className
          )
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;