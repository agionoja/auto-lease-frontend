import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import fetchClient from "~/utils/fetchClient";
import { LabelInput } from "~/components/label-input";

export async function action({ request }: ActionFunctionArgs) {
  const { email } = Object.fromEntries(await request.formData());

  const res = await fetchClient(`/auth/request/token`, {
    method: "PATCH",
    body: JSON.stringify({ email }),
  });

  console.log(res);
  if (res.statusText === "success") redirect("/");
  return json({ message: res.message });
}

export default function RequestToken() {
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
      <LabelInput
        label={"Email Address"}
        type={"email"}
        name={"email"}
        placeholder={"Email"}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-black text-white py-3 rounded-lg ${isSubmitting && "opacity-50"} ${isSubmitting && "cursor-not-allowed"}`}
      >
        {isSubmitting ? "Requesting..." : "Request Verification Token"}
      </button>
    </Form>
  );
}
