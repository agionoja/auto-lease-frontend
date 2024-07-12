import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import fetchClient from "~/utils/fetchClient";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { LabelInput } from "~/components/label-input";

export async function action({ request }: ActionFunctionArgs) {
  const { email, password, passwordConfirm, name } = Object.fromEntries(
    await request.formData(),
  );

  const res = await fetchClient("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify({ email, password, passwordConfirm, name }),
  });

  console.log(res);

  if (res.statusText === "success") {
    return redirect("/auth/2fa/login");
  } else if (res.statusText === "fail" || res.statusText === "error") {
    return json({ message: res.message });
  }
  return json({ message: "Network error occurred. Please try again later." });
}

export default function Register() {
  const actionData = useActionData();
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <LabelInput
        label={"Password"}
        type={"password"}
        name={"password"}
        placeholder={"Password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {actionData?.message && (
        <div className="text-red-500">{actionData.message}</div>
      )}

      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className={`bg-black text-white py-3 rounded-lg ${isFormValid ? "opacity-100" : "opacity-50"} ${isSubmitting && "cursor-not-allowed"}`}
      >
        {isSubmitting ? "Submitting..." : "Login"}
      </button>
    </Form>
  );
}
