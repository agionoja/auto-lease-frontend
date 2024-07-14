import { ActionFunctionArgs, json, MetaFunction } from "@remix-run/node";
import fetchClient from "~/api/fetchClient";
import Form from "~/components/form";
import { emailRegex } from "~/utils/validators";
import { useActionData } from "@remix-run/react";
import { AuthLinks } from "~/components/auth-links";

export async function action({ request }: ActionFunctionArgs) {
  const { email } = Object.fromEntries(await request.formData());

  const response = await fetchClient(`/auth/request/token`, {
    method: "PATCH",
    body: JSON.stringify({ email }),
  });

  return json({
    response,
  });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Request Token", value: "token" },
    { name: "Verification", content: "Verify your account" },
  ];
};

export default function RequestToken() {
  const actionData = useActionData<typeof action>();
  return (
    <>
      <Form
        method={"POST"}
        response={actionData?.response}
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
      <AuthLinks links={[{ url: "/auth/login", urlText: "Log in" }]} />
    </>
  );
}
