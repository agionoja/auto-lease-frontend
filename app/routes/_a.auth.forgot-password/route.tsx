import { ActionFunctionArgs, json, MetaFunction } from "@remix-run/node";
import Form from "~/components/form";
import { InputMsg } from "~/utils/enum";
import { emailRegex } from "~/utils/validators";
import fetchClient from "~/api/fetchClient";
import { Link, useActionData } from "@remix-run/react";

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
        response={{
          message: actionData?.response.message,
          ok: actionData?.response.ok,
        }}
        inputArr={[
          {
            label: "email",
            inputProps: {
              type: "email",
              name: "email",
              placeholder: "Enter your email",
              validator: {
                message: InputMsg.EMAIL,
                func: emailRegex,
              },
            },
          },
        ]}
      />

      <div className={"auth-side-action"}>
        <Link to={"/auth/register"} className={"underline"}>
          Register
        </Link>
        <Link to={"/auth/login"} className={"underline"}>
          Login
        </Link>
      </div>
    </>
  );
}
