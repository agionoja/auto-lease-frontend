import React from "react";

type Props = {
  type: string;
  placeholder: string;
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function LabelInput({
  type,
  name,
  placeholder,
  label,
  value,
  onChange,
}: Props) {
  return (
    <label className="flex-col flex gap-2">
      <span>{label}</span>
      <input
        placeholder={placeholder}
        className="px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 outline outline-2 outline-gray-200 rounded-lg py-2.5"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
