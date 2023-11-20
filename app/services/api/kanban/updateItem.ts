import type {Item} from "~/components/kanban/KanbanInfo/root";

type input = {
    session: {
        UserAccount: string;
        Session: string;
        Auth: string;
        Board: string;
    },
    item: Item
};

export default async function updateItem({session, item}: input): Promise<boolean> {
    const myHeaders = new Headers();
    myHeaders.append("X-UserAccount", session.UserAccount);
    myHeaders.append("X-Session", session.Session);
    myHeaders.append("X-Auth", session.Auth);
    myHeaders.append("X-Board", session.Board);

    var urlencoded = new URLSearchParams();
    Object.keys(item).forEach(key => {
        if(key === "Comment") return;
        if(key === "Label") urlencoded.append(key.toLowerCase(), item.Label.Id)
        // if(key === "Label") return;
        else if(key === "Status") {
            switch (item[key]) {
                case 0:
                    urlencoded.append("status", "todo")
                    break;
                case 1:
                    urlencoded.append("status", "progress")
                    break;
                case 2:
                    urlencoded.append("status", "completed")
                    break;
                case 3:
                    urlencoded.append("status", "cancelled")
                    break;
                case 4:
                    urlencoded.append("status", "backlog")
                    break;
            }
        }
        // @ts-ignore
        else urlencoded.append(key.toLowerCase(), item[key])
    })

    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: urlencoded
    };

    const resp = await fetch(
        window.ENV.API_DOMAIN + "/kanban/item",
        requestOptions
    );
    if(resp.status === 200) return true;
    return false
}
