import { Form as RemixForm, useNavigation } from "@remix-run/react";
import { InputProps } from "~/components/input";
import { LabelInput } from "~/components/label-input";
import { useEffect, useRef, useState } from "react";

type BtnLabel = {
  static: string;
  pending: string;
};

type Response = {
  message?: string;
  ok?: boolean;
};

type Props = {
  action?: string;
  method?: "POST" | "PATCH" | "DELETE" | "GET";
  btnLabel?: BtnLabel;
  response: Response;
  inputArr?: Array<{
    inputProps: InputProps;
    label: string;
  }>;
  encType?:
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain";
};

export default function Form({
  inputArr,
  action,
  method = "GET",
  encType = "application/x-www-form-urlencoded",
  btnLabel,
  response,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [allValid, setAllValid] = useState(false);
  const [allInputValidity, setAllInputValidity] = useState<boolean[]>(
    new Array(inputArr?.length).fill(false),
  );

  const { state } = useNavigation();
  const isSubmitting = state === "submitting" || state === "loading";
  const disabled = isSubmitting || !allValid;

  useEffect(() => {
    if (!isSubmitting && response?.ok) formRef?.current?.reset();
  }, [response, isSubmitting]);

  useEffect(() => {
    setAllValid(allInputValidity.every(Boolean));
  }, [allInputValidity]);

  const handleGetIsValid = (index: number, isValid: boolean) => {
    setAllInputValidity((prevState) => {
      const newValidity = [...prevState];
      newValidity[index] = isValid;
      return newValidity;
    });
  };

  return (
    <RemixForm
      ref={formRef}
      encType={encType}
      method={method}
      action={action}
      className={`flex flex-col gap-8`}
    >
      {inputArr?.map(({ inputProps, label }, index) => (
        <LabelInput
          key={index}
          type={inputProps.type}
          placeholder={inputProps.placeholder}
          label={label}
          name={inputProps.name}
          value={inputProps.value}
          validator={inputProps.validator}
          validationIndicator={inputProps.validationIndicator}
          required={inputProps.required}
          onBlur={inputProps.onBlur}
          onInput={inputProps.onInput}
          onGetIsValid={(isValid) => handleGetIsValid(index, isValid)}
        />
      ))}
      <button
        disabled={disabled}
        type="submit"
        className={`bg-black text-white py-3.5 rounded-xl ${isSubmitting && "animate-pulse cursor-not-allowed"}`}
      >
        {isSubmitting ? `${btnLabel?.pending}..` : btnLabel?.static}
      </button>

      {response?.message && (
        <span
          className={`${response.ok ? "text-black" : "text-red-400"} text-sm mx-auto min-w-[300px] max-w-[30rem] text-center`}
        >
          {response.message}
        </span>
      )}
    </RemixForm>
  );
}
