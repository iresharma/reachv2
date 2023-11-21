import type {ActionArgs} from "@remix-run/node";
import {signup} from "~/services/api/auth/signup";
import {redirect} from "react-router";
import {signIn} from "~/services/api/auth/signin";
import {commitSession} from "~/session";


export const action = async ({ request }: ActionArgs) => {
    console.log("hit this")
    const formData = Object.fromEntries(await request.formData());
    const {email, password} = formData;
    const resp = await signup({email: email.toString(), password: password.toString()});

    if (resp !== 201) {
        return redirect("/auth")
    }
    const respSignIn = await signIn({email: email.toString(), password: password.toString(), signup: true});
    return redirect("/auth/useraccount", {
        headers: {
            "Set-Cookie": await commitSession(respSignIn.session)
        }
    })
}
