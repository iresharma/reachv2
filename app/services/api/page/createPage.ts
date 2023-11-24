import * as process from "process";

import {createKanbanInput} from "~/services/api/kanban/createKanban";

export type CreateLinkInput = {
    route: string;
    session: createKanbanInput;
}

export default async function CreatePageLink({route, session}: CreateLinkInput) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-UserAccount", session.userAccount);
    myHeaders.append("X-Session", session.session);
    myHeaders.append("X-Auth", session.auth);

    var urlencoded = new URLSearchParams();
    urlencoded.append("route", route);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded
    };

    const resp = await fetch(
        process.env.API_DOMAIN + "/page",
        requestOptions
    );
    const data = await resp.json()
    return data;
}
