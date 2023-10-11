export type createKanbanInput = {
    session: string;
    auth: string;
    userAccount: string;
}

export const createKanban = async (session: createKanbanInput): Promise<string> => {
    var myHeaders = new Headers();

    myHeaders.append("X-Auth", session.auth);
    myHeaders.append("X-Session", session.session);
    myHeaders.append("X-UserAccount", session.userAccount);

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
    };
    const resp = await fetch(
        `http://localhost:8080/kanban`,
        requestOptions,
    );
    const data = await resp.json();
    return data.Id
};
