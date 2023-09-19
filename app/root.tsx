import styles from "./tailwind.css"
import loaderStyles from "./styles/misc-components/loaders.css"
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import {useState} from "react";
import {MainNav} from "~/components/main-nav";
import {UserNav} from "~/components/user-nav";
import {Input} from "~/components/ui/input";
import {Toaster} from "~/components/ui/toaster";
import {CommandPallet} from "~/components/command-pallet";
import {commitSession, getSession} from "~/session";
import {json} from "@remix-run/node";
import {redirect, useLoaderData} from "react-router";
import {validateSession} from "~/services/api/auth/validateSession";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: loaderStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

// @ts-ignore
export const loader = async ({request}) =>{
  const session = await getSession(request.headers.get("Cookie"));
  const auth = session.get("X-Auth")
  const url = new URL(request.url);
  if (typeof auth === "undefined") {
      if(!url.pathname.split("/").includes("auth")) {
        return redirect('/auth')
      } else {
          return {
              auth: "false"
          }
      }
  }
  const validateSessionResp = await validateSession({session: session.get("X-Session"), auth})
  if(validateSessionResp) {
    return json({
      auth: "true"
    })
  } else {
      session.unset("X-Auth");
      session.unset("X-Session");
      session.unset("X-UserAccount");
      session.unset("X-Kanban");
      session.unset("X-Perm");
      return redirect("/auth", {
        headers: {
          "Set-Cookie": await commitSession(session)
        }
      })
  }
}

export default function App() {
  const loaderData = useLoaderData();
  // @ts-ignore
  const [isAuth] = useState(loaderData.auth === "true");
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {isAuth && (
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                  <Input
                      type="search"
                      placeholder="Search..."
                      className="md:w-[100px] lg:w-[300px]"
                  />
                  <UserNav />
                </div>
              </div>
            </div>
        )}
        <main>
          <Outlet />
        </main>
        <Toaster />
        <CommandPallet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
