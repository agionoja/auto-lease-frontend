import React, { useState } from "react";

type Props = {
  type: string;
  placeholder: string;
  label: string;
  name: string;
  value?: string;
  validator?: (value: string) => boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function LabelInput({
  type,
  name,
  placeholder,
  label,
  value,
  validator,
}: Props) {
  const [isvalid, setIsValid] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validator) setIsValid(validator(event.target.value));
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <label className="flex-col flex gap-2">
      <span>{label}</span>
      <input
        placeholder={placeholder}
        className="px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 outline outline-2 outline-gray-200 rounded-lg py-2.5"
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
}
