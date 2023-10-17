import {Session, SessionData} from "@remix-run/node";
import {Item} from "~/components/kanban/KanbanInfo/root";

type input = { page: number; limit: number; session: Session<SessionData, SessionData>; };

export default async function getKanbanItems({ page, limit, session }: input): Promise<Item[]> {
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
        "http://localhost:8080/kanban/item?" +
        new URLSearchParams({ page: page.toString(), limit: limit.toString() }),
        requestOptions,
    );
    const data = await resp.json();
    return data["Items"] as Item[];
}
