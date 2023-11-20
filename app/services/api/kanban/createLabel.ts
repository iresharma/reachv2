type input = {
    session: {
        UserAccount: string;
        Session: string;
        Auth: string;
        Board: string;
    },
    labelData: {
        label: string;
        color:string;
    }
};

export default async function createLabel({session, labelData}: input) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-UserAccount", session.UserAccount);
    myHeaders.append("X-Session", session.Session);
    myHeaders.append("X-Auth", session.Auth);

    var urlencoded = new URLSearchParams();
    urlencoded.append("label", labelData.label);
    urlencoded.append("color", labelData.color);
    urlencoded.append("board", session.Board);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded
    };

    const _ = await fetch(
        window.ENV.API_DOMAIN + "/kanban/label",
        requestOptions
    );
    return "OK";
}
