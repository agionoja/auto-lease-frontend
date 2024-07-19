import React, { useState, useEffect } from "react";

type Validator = {
  func: (value: string) => boolean;
  message?: string;
};

export type InputProps = {
  type: string;
  className?: string;
  placeholder: string;
  name: string;
  value?: string;
  validator?: Validator;
  validationIndicator?: React.ReactNode;
  required?: boolean;
  fileType?: "pdf" | "image/jpg" | "image/png" | "image/jpeg" | "*";
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onGetIsValid?: (value: boolean) => void;
};

export function Input(props: InputProps) {
  const [isValid, setIsValid] = useState(true);
  const [value, setValue] = useState(props.value || "");
  const [touched, setTouched] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      if (props.validator) {
        const isValid = props.validator.func(newValue);
        setIsValid(isValid);
        if (props.onGetIsValid) props.onGetIsValid(isValid);
      } else if (props.onGetIsValid) {
        props.onGetIsValid(true);
      }
    }, 200); // Debounce delay time

    setDebounceTimeout(timeout);

    if (props.onInput) props.onInput(event);
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    if (props.validator) {
      const isValid = props.validator.func(event.target.value);
      setIsValid(isValid);
      if (props.onGetIsValid) props.onGetIsValid(isValid);
    }
    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (props.onFocus) {
      props.onFocus(event);
    }
  };

  return (
    <div className={"relative w-full"}>
      <input
        id={props.name}
        accept={props.fileType}
        placeholder={props.placeholder}
        className={
          props.className +
          " " +
          `px-4 w-full focus:outline-none flex flex-col focus:ring-2 focus:ring-blue-400 outline outline-2 outline-secondary rounded-lg  ${props.type === "file" ? "py-4" : "py-2.5"}`
        }
        type={props.type}
        name={props.name}
        value={value}
        onInput={handleInput}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required={props.required}
      />

      {props.validationIndicator && (
        <div className={"mt-4 flex flex-col gap-2.5"}>
          {props.validationIndicator}
        </div>
      )}

      {!props.validationIndicator && !isValid && touched && (
        <span className="text-red-500 text-xs absolute -bottom-6">
          {props.validator?.message}
        </span>
      )}
    </div>
  );
}
