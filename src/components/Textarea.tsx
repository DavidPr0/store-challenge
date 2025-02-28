"use client";

import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, ...props }: TextareaProps) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <textarea className="border w-full p-2" {...props} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
