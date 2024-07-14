import {
  ActionFunctionArgs,
  json,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import fetchClient from "~/api/fetchClient";
import Form from "~/components/form";
import { InputMsg } from "~/utils/enum";
import { useActionData } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  const { otp } = Object.fromEntries(await request.formData());

  const response = await fetchClient(`/auth/2fa/`, {
    method: "PATCH",
    body: JSON.stringify({ otp }),
  });

  if (response.ok) return redirect("/");
  return json({ response });
}

export const meta: MetaFunction = () => {
  return [
    { title: "2FA", value: "One Time Password" },
    { name: "2FA", content: "Two Factor Authentication" },
  ];
};

export default function RequestToken() {
  const actionData = useActionData<typeof action>();

  console.log(actionData?.response);
  return (
    <Form
      response={{
        message: actionData?.response?.message,
        ok: actionData?.response?.ok,
      }}
      method={"POST"}
      btnLabel={{
        static: "Login",
        pending: "Logging in",
      }}
      inputArr={[
        {
          label: "OTP",
          inputProps: {
            name: "otp",
            placeholder: "Enter your OTP",
            type: "number",
            validator: {
              message: InputMsg.OTP,
              func: (value) => value.length === 6,
            },
          },
        },
      ]}
    />
  );
}
