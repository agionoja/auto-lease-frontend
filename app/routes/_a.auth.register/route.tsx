import {
  ActionFunctionArgs,
  json,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import Form from "~/components/form";
import { useState } from "react";
import { RegPasswordValidator } from "~/components/regPasswordValidator";
import { emailRegex, passwordRegex } from "~/utils/validators";
import { InputMsg } from "~/utils/enum";
import fetchClient from "~/api/fetchClient";
import { Link, useActionData } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  const { email, password, passwordConfirm, name } = Object.fromEntries(
    await request.formData(),
  );

  const response = await fetchClient("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify({ email, password, passwordConfirm, name }),
  });

  if (response.ok) return redirect("/auth/2fa/login");
  return json({ response });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Register" },
    { name: "Registration", content: "Register your account" },
  ];
};

export default function Register() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const actionData = useActionData<typeof action>();

  return (
    <>
      <Form
        method={"POST"}
        btnLabel={{
          static: "Register",
          pending: "Registering",
        }}
        response={{
          message: actionData?.response.message,
          ok: actionData?.response.ok,
        }}
        inputArr={[
          {
            label: "Full name",
            inputProps: {
              type: "text",
              placeholder: "Enter your name",
              name: "name",
              validator: {
                func: (value) => value.length > 3,
                message: "Name should be at least 4 characters",
              },
            },
          },
          {
            label: "Email",
            inputProps: {
              type: "email",
              placeholder: "Enter your email",
              name: "email",
              validator: {
                func: emailRegex,
                message: "Invalid email address",
              },
            },
          },
          {
            label: "Password",
            inputProps: {
              type: "password",
              placeholder: "Enter your password",
              name: "password",
              value: password,
              onInput: (e) => setPassword(e.target.value),
              validationIndicator: <RegPasswordValidator value={password} />,
              validator: {
                func: passwordRegex,
                message: InputMsg.PASSWORD_REGISTRATION,
              },
            },
          },
          {
            label: "Confirm Password",
            inputProps: {
              type: "password",
              placeholder: "Confirm your password",
              name: "passwordConfirm",
              value: passwordConfirm,
              onInput: (e) => setPasswordConfirm(e.target.value),
              validator: {
                func: (value) => password === value,
                message: InputMsg.PASSWORD_CONFIRM,
              },
            },
          },
        ]}
      />
      <div className={"auth-side-action"}>
        <Link to={"/auth/login"}>
          Already have an account? <span className={"mx-2"}> {">"} </span>
          <strong className={"underline"}>Login</strong>
        </Link>
      </div>
    </>
  );
}
