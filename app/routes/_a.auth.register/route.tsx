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
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      email.length > 0 &&
        password.length > 0 &&
        passwordConfirm.length > 0 &&
        name.length > 0,
    );
  }, [email, password, passwordConfirm, name]);

  useEffect(() => {
    if (!isSubmitting && actionData?.message === "success") {
      formRef?.current?.reset();
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setName("");
    }
  }, [isSubmitting, actionData]);

  return (
    <Form ref={formRef} className={"flex flex-col gap-8 "} method={"POST"}>
      <LabelInput
        label={"Full Name"}
        type={"text"}
        name={"name"}
        placeholder={"Full Name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <LabelInput
        label={"Email Address"}
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
      <LabelInput
        label={"Confirm Password"}
        type={"password"}
        name={"passwordConfirm"}
        placeholder={"Confirm Password"}
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      {actionData?.message && (
        <div className="text-red-500">{actionData.message}</div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-black text-white py-3 rounded-lg ${isFormValid ? "opacity-100" : "opacity-50"} ${isSubmitting && "cursor-not-allowed"}`}
      >
        {isSubmitting ? "Submitting..." : "Register"}
      </button>
    </Form>
  );
}
