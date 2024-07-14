import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import fetchClient from "~/api/fetchClient";
import Form from "~/components/form";
import { emailRegex, passwordRegex } from "~/utils/validators";

export async function action({ params, request }: ActionFunctionArgs) {
  const token = params.token;
  const res = await fetchClient(`/auth/verify/${token}`, { method: "PATCH" });

  if (res.statusText === "success") redirect("/");
  return json({ message: res.message });
}

export default function VerifyAccount() {
  return (
    <Form
      method={"POST"}
      inputArr={[
        {
          label: "Email",
          inputProps: {
            name: "email",
            placeholder: "Enter your email",
            type: "email",
            validator: emailRegex,
          },
        },
        {
          label: "password",
          inputProps: {
            name: "password",
            placeholder: "Enter your password",
            type: "password",
            validator: passwordRegex,
          },
        },
        {
          label: "Photo",
          inputProps: {
            name: "photo",
            placeholder: "Enter your password",
            type: "file",
            fileType: "image/png",
          },
        },
      ]}
    />
  );
}
