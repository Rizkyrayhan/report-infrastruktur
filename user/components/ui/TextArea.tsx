import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id || label.replace(/\s+/g, '-').toLowerCase();
    
    return (
      <div className="flex flex-col space-y-1 mb-4">
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <textarea
          id={inputId}
          ref={ref}
          className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-shadow min-h-[100px] ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';
