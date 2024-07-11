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
      <img src={authImg} className={"mx-auto"} alt="" />
    </div>
  );
}
