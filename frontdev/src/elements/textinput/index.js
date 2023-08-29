import {forwardRef} from 'react';
import clsx from 'clsx';



export const TextInput = forwardRef(
    ({ error, caption, label, className, placeholder, ...rest }, ref) => {
        return (
            <input
                className={clsx(
                    'input bg-white placeholder:text-lg placeholder:text-gray-500 placeholder:font-semibold h-12 outline-none',
                    error &&
                    'input-error text-red-500, placeholder:text-red-500 input-bordered',
                    className
                )}
                placeholder={placeholder}
                ref={ref}
                {...rest}
            />
        );
    }
);

TextInput.displayName = 'TextInput';
