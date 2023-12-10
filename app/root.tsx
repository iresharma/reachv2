import styles from "./tailwind.css"
import loaderStyles from "./styles/misc-components/loaders.css"
import {cssBundleHref} from "@remix-run/css-bundle";
import type {LinksFunction} from "@remix-run/node";
import {
    isRouteErrorResponse,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useRouteError,
} from "@remix-run/react";
import {useEffect} from "react";
import {MainNav} from "~/components/misc/main-nav";
import {UserNav} from "~/components/misc/user-nav";
import {Input} from "~/components/ui/input";
import {Toaster} from "~/components/ui/toaster";
import {CommandPallet} from "~/components/misc/command-pallet";
import {commitSession, getSession} from "~/session";
import {json} from "@remix-run/node";
import {redirect, useLoaderData, useMatches} from "react-router";
import {validateSession} from "~/services/api/auth/validateSession";
import NotFound from "~/components/misc/404";
import {Button} from "~/components/ui/button";
import {SunIcon} from "lucide-react";
import switchTheme from "~/services/utils/themeSwitcher";
import * as process from "process";

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: styles},
    {rel: "stylesheet", href: loaderStyles},
    {rel: "preconnect", href: "https://fonts.googleapis.com"},
    {rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@100;400;600&family=Pixelify+Sans&display=swap"
    },
    ...(cssBundleHref ? [{rel: "stylesheet", href: cssBundleHref}] : []),
];

// @ts-ignore
export const loader = async ({request}) => {
    const session = await getSession(request.headers.get("Cookie"));
    const auth = session.get("X-Auth")
    const userAccount = session.get("X-UserAccount")
    const url = new URL(request.url);
    if (typeof auth === "undefined") {
        if (!url.pathname.split("/").includes("auth")) {
            return redirect('/auth')
        } else {
            return json({
                auth: "false",
                ENV: {
                    API_DOMAIN: process.env.API_DOMAIN
                }
            })
        }
    } else if (typeof userAccount === "undefined") {
        if (!url.pathname.split("/").includes("auth")) {
            return redirect("/auth/useraccount")
        }
    }
    const validateSessionResp = await validateSession({session: session.get("X-Session"), auth})
    if (validateSessionResp) {
        return json({
            auth: "true",
            ENV: {
                API_DOMAIN: process.env.API_DOMAIN
            }
        })
    } else {
        session.unset("X-Auth");
        session.unset("X-Session");
        session.unset("X-UserAccount");
        session.unset("X-Board");
        session.unset("X-Perm");
        return redirect("/auth", {
            headers: {
                "Set-Cookie": await commitSession(session)
            }
        })
    }
}

export default function App() {
    useEffect(() => {
        switchTheme();
    }, []);
    const loaderData = useLoaderData();
    const routes = useMatches();
    // @ts-ignore
    const isAuth = () => {
        // @ts-ignore
        const data = routes.at(-1).pathname
        return !data.includes("auth")
    }
    // @ts-ignore
    return (
        <html lang="en" className="dark" id="html">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        {isAuth() && (
            <div className="border-b sticky top-0 dark:bg-slate-900 bg-zinc-300 z-10">
                <div className="flex h-16 items-center px-4">
                    <MainNav className="mx-6"/>
                    <div className="ml-auto flex items-center space-x-4">
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="md:w-[100px] lg:w-[300px]"
                        />
                        <Button variant="outline" onClick={() => switchTheme(localStorage.getItem("theme") ?? "dark")}
                                size="icon">
                            <SunIcon className="w-4 h-4"/>
                        </Button>
                        <UserNav/>
                    </div>
                </div>
            </div>
        )}
        <main>
            <Outlet/>
        </main>
        <Toaster/>
        <CommandPallet/>
        <ScrollRestoration/>
        <script
            dangerouslySetInnerHTML={{
                __html: `window.ENV = ${JSON.stringify(
                    loaderData?.ENV ?? {}
                )}`,
            }}
        />
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    return (
        <html>
        <head>
            <title>Oops!</title>
            <Meta/>
            <Links/>
        </head>
        <body>
        <h1>
            {isRouteErrorResponse(error)
                ? error.status === 404 ? <NotFound/> : error instanceof Error
                    ? error.message
                    : "Unknown Error"
                : error instanceof Error
                    ? error.message
                    : "Unknown Error"}
        </h1>
        <Scripts/>
        </body>
        </html>
    );
}
