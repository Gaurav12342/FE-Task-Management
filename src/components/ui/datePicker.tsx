import React from "react";

interface CustomDatePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      <input
        type="date"
        {...props}
        className={`
          block w-full px-3 py-2 border border-gray-300 rounded-md 
          text-gray-900 placeholder-gray-400 bg-white focus:outline-none 
          focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
          ${className}
        `}
      />
    </div>
  );
};
