import { getSession } from "~/sesssion/session.server";
import { redirect } from "@remix-run/node";

export const requireUserSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("token")) redirect("/login");
  return session;
};
