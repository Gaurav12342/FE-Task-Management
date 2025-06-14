// src/components/CustomLabel.tsx
import { Label } from "@radix-ui/react-label";
import React from "react";

interface CustomLabelProps extends React.ComponentProps<typeof Label> {
  children: React.ReactNode;
}

export const CustomLabel: React.FC<CustomLabelProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <Label
      className={`text-sm font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </Label>
  );
};
