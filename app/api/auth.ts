import fetchClient from "~/api/fetchClient";
import { redirect } from "@remix-run/node";

export const registerUser = async (request: Request) => {
  const { email, password, passwordConfirm, name } = Object.fromEntries(
    await request.formData(),
  );

  const res = await fetchClient("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify({ email, password, passwordConfirm, name }),
  });

  if (res.statusText === "success") return redirect("/auth/2fa/login");
  else return res;
};

export const login = async (request: Request) => {
  const { email, password } = Object.fromEntries(await request.formData());

  const res = await fetchClient("/auth/sign-in", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (res.statusText === "success") return redirect("/auth/2fa/login");
  else return res;
};
export const login2fa = () => {};
export const verifyUser = () => {};
export const requestVerification = () => {};
export const requestVerificationLoggedIn = () => {};
export const forgotPassword = () => {};
export const resetPassword = () => {};
