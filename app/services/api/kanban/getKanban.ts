import {Session, SessionData} from "@remix-run/node";
import getLabels from "~/services/api/kanban/getLabels";
import getKanbanItems from "~/services/api/kanban/getKanbanItems";

type input = { page: number; limit: number; session: Session<SessionData, SessionData>; };

export default async function getKanban({ page, limit, session }: input) {
    const kanban = await getKanbanItems({ page, limit, session });
    const label = await getLabels({ session })
    return {
        "items": kanban,
        "labels": label
    };
}
