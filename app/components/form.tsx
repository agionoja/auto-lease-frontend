import { Form as RemixForm } from "@remix-run/react";
import React from "react";

type Props = {
  inputLabel: [
    {
      name: string;
      value: string;
      type: string;
      placeholder: string;
      label: string;
      validator?: (value: string) => boolean;
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    },
  ];
  method?: "POST" | "PATCH" | "DELETE" | "GET";
};

export default function Form({ inputLabel, method = "GET" }: Props) {
  return <RemixForm method={method}></RemixForm>;
}
