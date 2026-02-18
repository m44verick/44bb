import { cookies } from "next/headers";

const COOKIE_NAME = "dashboard_session";

export function isDashboardAuthenticated() {
  const token = cookies().get(COOKIE_NAME)?.value;
  return token === "ok";
}

export function setDashboardSession() {
  cookies().set(COOKIE_NAME, "ok", { httpOnly: true, sameSite: "lax", secure: false, path: "/", maxAge: 60 * 60 * 24 });
}

export function clearDashboardSession() {
  cookies().set(COOKIE_NAME, "", { httpOnly: true, maxAge: 0, path: "/" });
}
