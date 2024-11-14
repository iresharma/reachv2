import type {ActionArgs} from "@remix-run/node";
import {signIn} from "~/services/api/auth/signin";
import {redirect} from "react-router";
import {commitSession, getSession} from "~/session";


export const action = async ({ request }: ActionArgs) => {
    const session = await getSession(request.headers.get("Cookie"));
    const formData = Object.fromEntries(await request.formData());
    const {email, password} = formData;
    const resp = await signIn({email: email.toString(), password: password.toString()});
    if (resp.status !== 200) {
        const errorMessage = await resp.text();
        session.flash("error", errorMessage);
        return redirect("/auth", {
            headers: {
                "Set-Cookie": await commitSession(session)
            }
        });
    } else {
        return redirect("/", {
            headers: {
                "Set-Cookie": await commitSession(resp.session)
            }
        })
    }
}
