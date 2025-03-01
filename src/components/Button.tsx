import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 rounded font-semibold transition-colors duration-200";
  const variantClasses =
    variant === "default"
      ? "bg-blue-500 text-white hover:bg-blue-600"
      : "border border-blue-500 text-blue-500 hover:bg-blue-50";
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
