import {Session, SessionData} from "@remix-run/node";
import * as process from "process";

type input = { session: Session<SessionData, SessionData>; };

export default async function getLabels({ session }: input) {
    const myHeaders = new Headers();
    myHeaders.append("X-UserAccount", session.get("X-UserAccount"));
    myHeaders.append("X-Session", session.get("X-Session")!);
    myHeaders.append("X-Auth", session.get("X-Auth")!);
    myHeaders.append("X-Board", session.get("X-Board"));

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    const resp = await fetch(
        process.env.API_DOMAIN + "/kanban/labels",
        requestOptions
    );
    const data = await resp.json();
    return data["Labels"];
}
