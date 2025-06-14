import React from "react";

interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}

export const CustomTextarea: React.FC<CustomTextareaProps> = ({
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      <textarea
        {...props}
        className={`
          relative block w-full px-3 py-2 border border-gray-300 
          placeholder-gray-500 text-gray-900 bg-white rounded-md 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
          sm:text-sm resize-none
          ${className}
        `}
      />
    </div>
  );
};
