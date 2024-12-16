import React from "react";

type TextareaProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = ({onChange, children, className = '', placeholder, ...props } : TextareaProps) => {
    return (
        <textarea
            {...props}
            onChange={(e) => onChange(e)}
            className={`${className} p-4 pb-12 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600`}
            placeholder={placeholder}>
            {children}
        </textarea>
    )
}
