import React, { useState, useEffect } from "react";

type Validator = {
  func: (value: string) => boolean;
  message?: string;
};

export type InputProps = {
  type: string;
  placeholder: string;
  name: string;
  value?: string;
  validator?: Validator;
  validationIndicator?: React.ReactNode;
  required?: boolean;
  fileType?: "pdf" | "image/jpg" | "image/png" | "image/jpeg" | "*";
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGetIsValid?: (value: boolean) => void;
};

export function Input(props: InputProps) {
  const [isValid, setIsValid] = useState(true);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.validator) {
      const isValid = props.validator.func(event.target.value);
      setIsValid(isValid);
      if (props.onGetIsValid) props.onGetIsValid(isValid);
    }
    if (props.onGetIsValid && !props.validator) props.onGetIsValid(true);
    if (props.onInput) props.onInput(event);
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.validator) {
      setIsValid(props.validator.func(event.target.value));
    }
    if (props.onBlur) {
      props.onBlur(event);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (props.validator) {
      setIsValid(props.validator.func(event.target.value));
    }

    if (props.onFocus) {
      props.onFocus(event);
    }
  };

  useEffect(() => {
    if (props.value && props.validator) {
      setIsValid(props.validator.func(props.value));
    }
  }, [props.value, props.validator]);

  return (
    <>
      <input
        id={props.name}
        accept={props.fileType}
        placeholder={props.placeholder}
        className={`px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 outline outline-2 rounded-lg ${isValid ? "outline-gray-200" : "outline-red-500"} ${props.type === "file" ? "py-4" : "py-2.5"}`}
        type={props.type}
        name={props.name}
        value={props.value}
        onInput={handleInput}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required={props.required}
      />
      <div
        className={`${props.validationIndicator && "mt-4 flex flex-col gap-2.5"}`}
      >
        {props.validationIndicator}
      </div>
      {!props.validationIndicator && !isValid && (
        <span className="text-red-500 text-xs">{props.validator?.message}</span>
      )}
    </>
  );
}
