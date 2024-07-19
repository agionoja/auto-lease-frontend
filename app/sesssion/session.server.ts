import { createCookieSessionStorage, redirect } from "@remix-run/node";

type SessionData = {
  token: string;
};

type SessionFlashData = {
  error: string;
};

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "jwt",
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
      sameSite: "lax",
      secrets: ["ladfdf;shfalkjf", "jfdaslkfjsdkfj", "ldskjfakdfjldfjd"],
      secure: process.env.SESSION_SECURE === "production",
    },
  });

export const alreadyHasSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token")) {
    throw redirect("/"); // user is already logged in
  }

  const data = { error: session.get("error") };
  return { session, data };
};

export const storeSession = async (
  redirectTo: string,
  ok: boolean,
  request: Request,
  token?: string,
) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (!ok) {
    return redirect(`/auth${redirectTo}`, {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  if (token) {
    session.set("token", token);
    throw redirect("/", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }
};

export const logout = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};

export const requireUser = async (request: Request) => {};
