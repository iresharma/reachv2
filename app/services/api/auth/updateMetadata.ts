import * as process from "process";

export type updateMetaData = {
    session: string;
    auth: string;
    name: string;
}

export const updateMetadata = async (session: updateMetaData): Promise<void> => {
    let myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-Auth", session.auth);
    myHeaders.append("X-Session", session.session);

    let urlencoded = new URLSearchParams();
    urlencoded.append("name", session.name)

    let requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: urlencoded
    };

    await fetch(
        window.ENV.API_DOMAIN + `/metadata`,
        requestOptions,
    );
};
