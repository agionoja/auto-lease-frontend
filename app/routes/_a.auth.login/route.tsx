import {
  ActionFunctionArgs,
  json,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import Form from "~/components/form";
import { emailRegex } from "~/utils/validators";
import { InputMsg } from "~/utils/enum";
import { useActionData } from "@remix-run/react";
import fetchClient from "~/api/fetchClient";
import { AuthLinks } from "~/components/auth-links";
import { alreadyHasSession } from "~/sesssion/session.server";

export async function loader({ request }: ActionFunctionArgs) {
  await alreadyHasSession(request);
}

export async function action({ request }: ActionFunctionArgs) {
  const { email, password } = Object.fromEntries(await request.formData());

  const response = await fetchClient("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      Authorization: "",
    },
  });

  if (response.ok) return redirect("/auth/2fa");
  else return json({ response });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
    { name: "Authentication", content: "Log in to your account" },
  ];
};

export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <>
      <Form
        btnLabel={{ static: "Get OTP", pending: "Sending OTP" }}
        response={actionData?.response}
        method={"POST"}
        inputArr={[
          {
            label: "Email",
            inputProps: {
              name: "email",
              placeholder: "Enter your email",
              type: "email",
              validator: {
                message: InputMsg.EMAIL,
                func: emailRegex,
              },
            },
          },
          {
            label: "Password",
            inputProps: {
              name: "password",
              placeholder: "Enter your password",
              type: "password",
              validator: {
                func: (value) => value.length >= 1,
                message: InputMsg.PASSWORD_LOGIN,
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
