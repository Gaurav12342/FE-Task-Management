import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      <input
        {...props}
        className={`
          relative block w-full px-3 py-2 border border-gray-300 
          placeholder-gray-500 text-gray-900 bg-white rounded-md  
          ${className}
        `}
      />
    </div>
  );
};
