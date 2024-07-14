import autoImg from "~/assets/images/auth.png";
import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <div
      className={
        "flex justify-center relative bg-auth-pattern bg-center bg-cover min-h-screen w-full md:py-12"
      }
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div
        className={
          "flex flex-col relative bg-white min-w-[375px] max-w-[40rem] min-h-full px-4 md:px-8 py-6 border-2 border-gray-200 rounded-lg"
        }
      >
        <img className={"w-full mb-10"} src={autoImg} alt="" />
        <Outlet />
      </div>
    </div>
  );
}
