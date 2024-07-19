import { Header } from "~/_landing/header";
import { Footer } from "~/_landing/footer";
import { Outlet } from "@remix-run/react";

export default function Landing() {
  return (
    <div className={"max-w-screen-2xl mx-auto"}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
