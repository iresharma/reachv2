type input = {
    session: {
        UserAccount: string;
        Session: string;
        Auth: string;
        Board: string;
    },
    message: string;
    item: string;
};

export default async function addComment({session, message, item}: input) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-UserAccount", session.UserAccount);
    myHeaders.append("X-Session", session.Session);
    myHeaders.append("X-Auth", session.Auth);
    myHeaders.append("X-Board", session.Board);

    var urlencoded = new URLSearchParams();
    urlencoded.append("message", JSON.stringify(message))

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded
    };

    const resp = await fetch(
        "http://localhost:8080/kanban/comment?item_id=" + item,
        requestOptions
    );
    const data = await resp.json()
    return data;
}
