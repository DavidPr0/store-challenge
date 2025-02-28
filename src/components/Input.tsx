"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <input className="border w-full p-2" {...props} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
