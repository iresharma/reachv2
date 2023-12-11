type CreateItemInput = {
    session: {
        UserAccount: string;
        Session: string;
        Auth: string;
        Board: string;
    };
    data: {
        Title: string;
        Status: string;
        Desc: string;
        Links: string;
        Label: string;
    }
}
export async function createItem({ session, data }: CreateItemInput): Promise<string> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-UserAccount", session.UserAccount);
    myHeaders.append("X-Session", session.Session);
    myHeaders.append("X-Auth", session.Auth);
    myHeaders.append("X-Board", session.Board);

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("label", data.Label)
    urlSearchParams.append("status",data.Status)
    urlSearchParams.append("title",data.Title)
    urlSearchParams.append("desc",data.Desc)
    urlSearchParams.append("links",data.Links)

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlSearchParams
    };

    const resp = await fetch(
        window.ENV.API_DOMAIN + "/kanban/item",
        requestOptions
    );

    const output = await resp.json()
    return output['Id']
}
