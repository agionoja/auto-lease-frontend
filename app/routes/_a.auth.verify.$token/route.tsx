import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import fetchClient from "~/utils/fetchClient";

export async function action({ params }: ActionFunctionArgs) {
  const token = params.token;

  const res = await fetchClient(`/auth/verify/${token}`, { method: "PATCH" });

  console.log(res);
  if (res.statusText === "success") redirect("/");
  return json({ message: res.message });
}

export default function VerifyAccount() {
  const actionData = useActionData();
  console.log(actionData);
  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isSubmitting) {
      formRef?.current?.reset();
    }
  }, [isSubmitting]);

  return (
    <Form ref={formRef} className={"flex flex-col gap-8 "} method={"POST"}>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-black text-white py-3 rounded-lg ${isSubmitting && "opacity-50"} ${isSubmitting && "cursor-not-allowed"}`}
      >
        {isSubmitting ? "Verifying..." : "Verify"}
      </button>
    </Form>
  );
}
