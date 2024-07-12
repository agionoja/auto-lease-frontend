import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useNavigation, useActionData } from "@remix-run/react";
import { LabelInput } from "~/components/label-input";
import fetchClient from "~/utils/fetchClient";
import { useEffect, useRef, useState } from "react";

export async function action({ request }: ActionFunctionArgs) {
  const { email, password } = Object.fromEntries(await request.formData());

  const res = await fetchClient("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  console.log(res);

  if (res.statusText === "success") {
    return redirect("/auth/2fa/login");
    // return json({ message: res.message });
  } else if (res.statusText === "fail" || res.statusText === "error") {
    return json({ message: res.message });
  }
  return json({ message: "Network error occurred. Please try again later." });
}

export default function Login() {
  const actionData = useActionData();
  console.log(actionData);
  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";
  const formRef = useRef<HTMLFormElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(email.length > 0 && password.length > 0);
  }, [email, password]);

  useEffect(() => {
    if (!isSubmitting) {
      formRef?.current?.reset();
    }
  }, [isSubmitting]);

  return (
    <Form ref={formRef} className={"flex flex-col gap-8 "} method={"POST"}>
      <LabelInput
        label={"Email"}
        type={"email"}
        name={"email"}
        placeholder={"Email"}
      />

      <LabelInput
        label={"Password"}
        type={"password"}
        name={"password"}
        placeholder={"Password"}
      />

      {actionData?.message && (
        <div className="text-red-500">{actionData.message}</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-black text-white py-3 rounded-lg ${isSubmitting && "opacity-50"} ${isSubmitting && "cursor-not-allowed"}`}
      >
        {isSubmitting ? "Sending OTP..." : "Get OTP"}
      </button>
    </Form>
  );
}
