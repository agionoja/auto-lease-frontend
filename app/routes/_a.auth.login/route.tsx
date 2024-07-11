import { Form } from "@remix-run/react";

export default function Login() {
  return (
    <Form className={"flex flex-col gap-8 "}>
      <label className={"flex-col flex gap-2"}>
        <span>Full Name</span>
        <input
          placeholder={"Full Name"}
          className={
            "px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 outline outline-2 outline-gray-200 rounded-lg py-2.5"
          }
          type="text"
          name={"name"}
        />
      </label>
      <label className={"flex flex-col gap-2"}>
        <span>Password</span>
        <input
          placeholder={"Password"}
          className={
            "px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 outline outline-2 outline-gray-200 rounded-lg py-2.5"
          }
          type="password"
          name={"password"}
        />
      </label>
      <button className={"bg-black text-white py-3 rounded-lg"}>Login</button>
    </Form>
  );
}
