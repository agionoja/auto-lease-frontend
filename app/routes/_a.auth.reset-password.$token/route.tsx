import { ActionFunctionArgs, json, MetaFunction } from "@remix-run/node";
import fetchClient from "~/api/fetchClient";
import { Link, useActionData } from "@remix-run/react";
import Form from "~/components/form";
import { passwordRegex } from "~/utils/validators";
import { InputMsg } from "~/utils/enum";
import { RegPasswordValidator } from "~/components/regPasswordValidator";
import { useState } from "react";

export async function action({ request, params }: ActionFunctionArgs) {
  const { password, passwordConfirm } = Object.fromEntries(
    await request.formData(),
  );

  console.log(params.token);
  const response = await fetchClient(`/auth/reset-password/${params.token}`, {
    method: "PATCH",
    body: JSON.stringify({ password, passwordConfirm }),
  });
  return json({ response });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Reset Password" },
    { name: "Password Reset", content: "Reset your password" },
  ];
};

export default function Route() {
  const actionData = useActionData<typeof action>();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <>
      <Form
        method={"POST"}
        response={{
          message: actionData?.response.message,
          ok: actionData?.response.ok,
        }}
        btnLabel={{
          static: "Reset password",
          pending: "Resetting password",
        }}
        inputArr={[
          {
            label: "New Password",
            inputProps: {
              value: password,
              type: "password",
              name: "password",
              placeholder: "Enter your new password",
              onInput: (e) => setPassword(e.target.value),
              validator: {
                func: passwordRegex,
              },
              validationIndicator: <RegPasswordValidator value={password} />,
            },
          },
          {
            label: "Confirm Password",
            inputProps: {
              type: "password",
              name: "passwordConfirm",
              placeholder: "Confirm your new password",
              value: passwordConfirm,
              onInput: (e) => setPasswordConfirm(e.target.value),
              validator: {
                func: (value) => value === password,
                message: InputMsg.PASSWORD_CONFIRM,
              },
            },
          },
        ]}
      />
      <div className={"auth-side-action"}>
        <Link to={"/auth/login"} className={"underline"}>
          Login
        </Link>
      </div>
    </>
  );
}
