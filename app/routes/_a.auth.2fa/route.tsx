import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import fetchClient from "~/api/fetchClient";
import Form from "~/components/form";
import { InputMsg } from "~/utils/enum";
import { useActionData } from "@remix-run/react";
import {
  alreadyHasSession,
  commitSession,
  storeSession,
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

  const response = await fetchClient(`/auth/2fa/`, {
    method: "PATCH",
    body: JSON.stringify({ otp }),
  });

  await storeSession("/2fa", response.ok, request, response.token);
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
  return (
    <Form
      response={actionData?.response}
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
