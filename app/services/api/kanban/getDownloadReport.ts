import {Session, SessionData} from "@remix-run/node";

type input = {
    session: {
        UserAccount: string;
        Session: string;
        Auth: string;
        Board: string;
    }
};

export default async function getDownloadReport({session}: input) {
    const myHeaders = new Headers();
    myHeaders.append("X-UserAccount", session.UserAccount);
    myHeaders.append("X-Session", session.Session);
    myHeaders.append("X-Auth", session.Auth);
    myHeaders.append("X-Board", session.Board);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    const resp = await fetch(
        window.ENV.API_DOMAIN + "/kanban/export",
        requestOptions
    );
    const data = await resp.json();
    return data["downloadLink"];
}
