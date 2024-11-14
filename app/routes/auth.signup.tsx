import type {ActionArgs} from "@remix-run/node";
import {signup} from "~/services/api/auth/signup";
import {redirect} from "react-router";
import {signIn} from "~/services/api/auth/signin";
import {commitSession, getSession} from "~/session";
import {emailValidate} from "~/services/api/auth/emailValidate";


export const action = async ({ request }: ActionArgs) => {
    const session = await getSession(request.headers.get("Cookie"));
    const formData = Object.fromEntries(await request.formData());
    const {email, password} = formData;
    const resp = await signup({email: email.toString(), password: password.toString()});

    if (resp.status !== 201) {
        const errorMessage = await resp.text();
        session.flash("error", errorMessage);
        return redirect("/auth", {
            headers: {
                "Set-Cookie": await commitSession(session)
            }
        });
    }
    const respSignIn = await signIn({email: email.toString(), password: password.toString(), signup: true});
    emailValidate(respSignIn.session.get("X-Auth"))
    return redirect("/auth/verify", {
        headers: {
            "Set-Cookie": await commitSession(respSignIn.session)
        }
    })
}
