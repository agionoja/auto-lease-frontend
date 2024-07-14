import {
  ActionFunctionArgs,
  json,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import Form from "~/components/form";
import { emailRegex } from "~/utils/validators";
import { InputMsg } from "~/utils/enum";
import { Link, useActionData } from "@remix-run/react";
import fetchClient from "~/api/fetchClient";

export async function action({ request }: ActionFunctionArgs) {
  const { email, password } = Object.fromEntries(await request.formData());

  const response = await fetchClient("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) return redirect("/auth/2fa/login");
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
        response={{
          message: actionData?.response.message,
          ok: actionData?.response.ok,
        }}
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
      <div className="auth-side-action">
        <Link to={"/auth/register"} className={"underline"}>
          Register
        </Link>
        <Link to={"/auth/forgot-password"} className={"underline"}>
          Forgot Password?
        </Link>
      </div>
    </>
  );
}
