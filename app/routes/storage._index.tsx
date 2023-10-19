import {LoaderArgs} from "@remix-run/node";
import {getSession} from "~/session";
import {redirect} from "react-router";

export const loader = async ({request}: LoaderArgs) => {
    const session = await getSession(request.headers.get("Cookie"))
    if (typeof session.get("X-Bucket") === "undefined" || session.get("X-Bucket") === "") {
        return redirect("/storage/new")
    }

    return {};
}
