import {commitSession, getSession} from "~/session";
import {redirect} from "react-router";

export const loader = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"));
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
