import clsx from 'clsx';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const variantClasses = {
    primary: 'bg-cinema-300 text-black hover:bg-cinema-200',
    secondary: 'bg-cinema-500 text-white hover:bg-cinema-400',
    tertiary: 'bg-black text-white hover:bg-cinema-800',
    destructive: '',
};

const sizeClasses = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
    wide: 'btn-wide',
};

export const Button = forwardRef(
    (
        { 
    variant = 'primary', 
    size = 'md',
    type = 'button',
    leftIcon,
    rightIcon,
    border = false,
    loading = false,
    disabled = false,
    fullWidth = false,
    round = false,
    className,
    children,
    ...props
}, ref) => {
    const icon = leftIcon || rightIcon;
    return (
        <button
        ref = {ref}
        type={type}
        className={twMerge(
            clsx(
                'btn flex items-center',
                icon? 'justify-between': 'justify-center',
                variantClasses[variant],
                sizeClasses[size],
                disabled && 'opacity-50 cursor-not-allowed',
                fullWidth && 'w-full',
                round && 'rounded-full',
                border && 'border',
                className
            )
        )}
        disabled={disabled || loading}
        {...props}
        >
        {icon && (
                <span className="w-12 h-full flex justify-center items-center">
                    {leftIcon}
                </span>
        )}
        {loading && <span className="loading loading-spinner" />}
        <div className={clsx(loading && 'hidden')}>{children}</div>
        {icon && (
            <span className="w-12 h-full flex items-center justify-center">
                {rightIcon}
            </span>
        )}
            </button>
    )

});

Button.displayName = 'Button';