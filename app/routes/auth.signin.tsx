import type {ActionArgs} from "@remix-run/node";
import {signIn} from "~/services/api/auth/signin";
import {redirect} from "react-router";
import {commitSession} from "~/session";


export const action = async ({ request }: ActionArgs) => {
    const formData = Object.fromEntries(await request.formData());
    const {email, password} = formData;
    console.log(email, password)
    const resp = await signIn({email: email.toString(), password: password.toString()});
    if (typeof resp.error !== "undefined") {
        return {
            title: "Something Went Wrong!",
            description: resp.error
        }
    } else {
        return redirect("/", {
            headers: {
                "Set-Cookie": await commitSession(resp.session)
            }
        })
    }
}
