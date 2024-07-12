import type { MetaFunction } from "@remix-run/node";
import authImg from "../../assets/images/auth.png";

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
    </div>
  );
}
