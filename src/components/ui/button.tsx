import React from "react";
import clsx from "clsx";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  variant?: "fill" | "outline";
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className = "",
  isLoading = false,
  variant = "fill",
  ...props
}) => {
  const baseClasses =
    "group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    fill: "text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent focus:ring-indigo-500",
    outline:
      "text-indigo-600 bg-white border border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
  };

  return (
    <button
      type="button"
      disabled={isLoading || props.disabled}
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
