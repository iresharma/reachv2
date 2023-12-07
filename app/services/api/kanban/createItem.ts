type CreateItemInput = {
    UserAccount: string;
    Session: string;
    Auth: string;
    Board: string;
    label: string;
}
export async function createItem({ UserAccount,  Session,  Auth,  Board, label }: CreateItemInput): Promise<string> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-UserAccount", UserAccount);
    myHeaders.append("X-Session", Session);
    myHeaders.append("X-Auth", Auth);
    myHeaders.append("X-Board", Board);

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("label", label)
    urlSearchParams.append("status",'')
    urlSearchParams.append("title",'')
    urlSearchParams.append("desc",'')
    urlSearchParams.append("links",'')

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlSearchParams
    };

    const resp = await fetch(
        window.ENV.API_DOMAIN + "/kanban/item",
        requestOptions
    );

    const data = await resp.json()
    return data['Id']
}
