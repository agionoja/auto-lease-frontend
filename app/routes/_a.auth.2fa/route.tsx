import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import fetchClient from "~/api/fetchClient";
import Form from "~/components/form";
import { InputMsg } from "~/utils/enum";
import { useActionData } from "@remix-run/react";
import {
  alreadyHasSession,
  commitSession,
  getSession,
} from "~/sesssion/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { data, session } = await alreadyHasSession(request);

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const { otp } = Object.fromEntries(await request.formData());
  const session = await getSession(request.headers.get("Cookie"));
  const response = await fetchClient(`/auth/2fa/`, {
    method: "PATCH",
    body: JSON.stringify({ otp }),
  });

  if (!response.ok) {
    session.flash("error", response.message || "Something went very wrong.");

    return redirect("/auth/login", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  console.log(response.data, response.token);

  if (response.token)
    return redirect("/", {
      headers: { "Set-Cookie": await commitSession(session) },
    });

  return null;
}

export const meta: MetaFunction = () => {
  return [
    { title: "2FA", value: "One Time Password" },
    { name: "2FA", content: "Two Factor Authentication" },
  ];
};

export default function RequestToken() {
  // const actionData = useActionData<typeof action>();
  return (
    <Form
      // response={actionData?.response}
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

// TODO: IMPLEMENT RESEND OTP
