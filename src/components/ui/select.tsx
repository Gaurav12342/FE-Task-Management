import React from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  className?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      <select
        {...props}
        className={`
          block w-full px-3 py-2 border border-gray-300 rounded-md 
          text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 
          focus:border-indigo-500 sm:text-sm
          ${className}
        `}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
