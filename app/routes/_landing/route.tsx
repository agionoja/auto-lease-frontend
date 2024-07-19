import { Outlet } from "@remix-run/react";
import { Header } from "~/routes/_landing/header";
import { Footer } from "~/routes/_landing/footer";

export default function Landing() {
  return (
    <div
      className={
        "mx-auto flex min-h-screen w-full max-w-screen-3xl flex-col justify-between gap-10"
      }
    >
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
