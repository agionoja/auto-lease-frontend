import {
  ActionFunctionArgs,
  json,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import fetchClient from "~/api/fetchClient";
import Form from "~/components/form";
import { emailRegex } from "~/utils/validators";

export async function action({ request }: ActionFunctionArgs) {
  const { email } = Object.fromEntries(await request.formData());

  const res = await fetchClient(`/auth/request/token`, {
    method: "PATCH",
    body: JSON.stringify({ email }),
  });

  console.log(res);
  if (res.statusText === "success") redirect("/");
  return json({ message: res.message });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Request Token", value: "token" },
    { name: "Verification", content: "Verify your account" },
  ];
};

export default function RequestToken() {
  return (
    <Form
      method={"POST"}
      btnLabel={{
        static: "Request verification token",
        pending: "Sending verification token",
      }}
      inputArr={[
        {
          label: "Email",
          inputProps: {
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            validator: {
              message: "Invalid email address",
              func: emailRegex,
            },
          },
        },
      ]}
    />
  );
}
