import { ActionFunctionArgs, json, MetaFunction } from "@remix-run/node";
import Form from "~/components/form";
import { InputMsg } from "~/utils/enum";
import { emailRegex } from "~/utils/validators";
import fetchClient from "~/api/fetchClient";
import { useActionData } from "@remix-run/react";
import { AuthLinks } from "~/components/auth-links";

export async function action({ request }: ActionFunctionArgs) {
  const { email } = Object.fromEntries(await request.formData());
  const response = await fetchClient("/auth/forgot-password", {
    method: "PATCH",
    body: JSON.stringify({ email }),
  });

  return json({ response });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Forgot Password" },
    { name: "Forgot Password", content: "Forgot your password, get a token" },
  ];
};

export default function Route() {
  const actionData = useActionData<typeof action>();
  return (
    <>
      <Form
        method={"POST"}
        btnLabel={{
          static: "Get Reset Token",
          pending: "Sending reset token",
        }}
        response={actionData?.response}
        inputArr={[
          {
            label: "email",
            inputProps: {
              type: "email",
              name: "email",
              placeholder: "Enter your email",
              required: true,
              validator: {
                message: InputMsg.EMAIL,
                func: emailRegex,
              },
            },
          },
        ]}
      />
      <AuthLinks
        links={[
          { url: "/auth/register", urlText: "Create account" },
          { url: "/auth/login", urlText: "Log in" },
        ]}
      />
    </>
  );
}
