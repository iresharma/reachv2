import Background from "~/assets/auth-page.svg";
import type {ActionArgs, V2_MetaFunction} from "@remix-run/node";
import {redirect, useActionData} from "react-router";
import {useToast} from "~/components/ui/use-toast";
import {commitSession, getSession} from "~/session";
import type {LinksFunction} from "@remix-run/node";
import inputStyles from "~/styles/auth/input.css"
import UserAccountInput from "~/components/auth/useraccount";
import {createUserAccount} from "~/services/api/auth/createUserAccount";

export const meta: V2_MetaFunction = () => {
    return [
        {title: "User Account"},
        {name: "description", content: "Authentication forms built using the components."},
    ];
};

export const links: LinksFunction = () => {
    return [
        {
            rel: "stylesheet",
            href: inputStyles
        }
    ];
}

export const action = async ({request}: ActionArgs) => {
    const session = await getSession(request.headers.get("Cookie"));
    const formData = Object.fromEntries(await request.formData());
    const {name} = formData;
    const createUserAccountResp = await createUserAccount({
        name: name.toString(),
        session: session.get("X-Session"),
        auth: session.get("X-Auth")
    })
    session.set("X-UserAccount", createUserAccountResp.id)
    session.set("X-UserAccountName", createUserAccountResp.name)
    return redirect("/", {
        headers: {
            "Set-Cookie": await commitSession(session)
        }
    })
}

export default function AuthenticationPage() {
    const actionData = useActionData();
    const {toast} = useToast();
    if (actionData) {
        toast(actionData)
    }
    return (
        <>
            <div
                className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="m-auto">
                    <UserAccountInput/>
                </div>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div
                        className="absolute inset-0  bg-no-repeat"
                        style={{
                            backgroundImage: `url(${Background})`,
                            backgroundSize: "60%",
                            backgroundPosition: "center 30%",
                        }}
                    />
                    <div className="relative z-20 flex items-center text-lg font-medium dark:text-white text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>
                        </svg>
                        Reach
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2 dark:text-white text-black">
                            <p className="text-4xl">
                                Store. Manage. <br/>
                                Collaborate. Create.
                            </p>
                            <p className="text-lg">
                                Reach provides you with a complete workspace to manage your
                                content and collaboration needs.
                            </p>
                            <a
                                href="https://iresharma.com"
                                target="_blank"
                                className="text-sm"
                            >
                                ~ Iresharma
                            </a>
                        </blockquote>
                    </div>
                </div>
            </div>
        </>
    );
}
