// app/sessions.js
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

const { getSession, commitSession, destroySession } =
    createCookieSessionStorage({
        // a Cookie from `createCookie` or the CookieOptions to create one
        cookie: {
            name: "__session",
            maxAge: 30 * 86400,
            path: "/",
            sameSite: "lax",
            secrets: ["c23f47fa81e4550ce6e735bae19fce49b6ec3b5be1c5ff8360562e0dabb5e0b9"],
            secure: true,
        },
    });

export { getSession, commitSession, destroySession };
