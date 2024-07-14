import {
  ActionFunctionArgs,
  json,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import fetchClient from "~/api/fetchClient";
import Form from "~/components/form";
import { useActionData } from "@remix-run/react";
import { AuthLinks } from "~/components/auth-links";

export async function action({ params }: ActionFunctionArgs) {
  const res = await fetchClient(`/auth/verify/${params.token}`, {
    method: "PATCH",
  });

  if (res.ok) redirect("/");
  return json({ response: res });
}

export const meta: MetaFunction = () => {
  return [
    { title: "Verify Account" },
    { name: "Verify", content: "Verify your account" },
  ];
};

export default function VerifyAccount() {
  const actionData = useActionData<typeof action>();
  return (
    <>
      <Form
        response={actionData?.response}
        method={"POST"}
        btnLabel={{
          static: "Verify account",
          pending: "Verifying account",
        }}
      />
      <AuthLinks links={[{ url: "/auth/login", urlText: "Log in" }]} />
    </>
  );
}
