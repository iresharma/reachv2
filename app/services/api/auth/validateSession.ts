export type validateSessionInput = {
    session: string;
    auth: string;
}

export const validateSession = async (session: validateSessionInput): Promise<boolean> => {
    var myHeaders = new Headers();

    if (session.auth === null || session.session === null) {
        return false;
    }

    myHeaders.append("X-Auth", session.auth);
    myHeaders.append("X-Session", session.session);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    const resp = await fetch(
        `http://localhost:8080/session`,
        requestOptions,
    );
    if (resp.status !== 200) {
        return false;
    }
    return true;
};
