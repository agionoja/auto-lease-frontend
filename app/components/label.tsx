import React from "react";

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
};

export function Label({ htmlFor, children }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="flex-col flex gap-2">
      {children}
    </label>
  );
}
