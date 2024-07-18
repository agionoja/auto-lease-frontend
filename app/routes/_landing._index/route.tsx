import type { MetaFunction } from "@remix-run/node";
import authImg from "../../assets/images/auth.png";
import { NavLink } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Auto Lease" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      <h1 className={"bg-red-300 animate-bounce "}>This is the home page</h1>

      <nav>
        <NavLink to={"/auth/register"}>Register</NavLink>
        <NavLink to={"/auth/login"}>Login</NavLink>
        <NavLink to={"/auth/2fa/login"}>Two Step Authentication</NavLink>
        <NavLink to={"/auth/request/Token"}>Request Token</NavLink>
        <NavLink to={"/auth/verify/"}>Verify Account</NavLink>
      </nav>
    </div>
  );
}
