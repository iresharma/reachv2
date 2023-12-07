import * as process from "process";

export const createMetaData = async ({ name, photourl, session, auth }: any): Promise<Response> => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    console.log(session)
    console.log(auth)
    myHeaders.append("X-Session", session);
    myHeaders.append("X-Auth", auth);

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", name);
    urlencoded.append("photourl", photourl)
    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    };
    const resp = await fetch(
        process.env.API_DOMAIN + `/metadata`,
        requestOptions,
    );
    return resp;
}
