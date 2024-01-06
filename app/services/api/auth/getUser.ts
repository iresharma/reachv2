import * as process from "process";

export type GetUserInput = {
    auth: string;
    session: string;
};

export const getUser = async ({auth, session}: GetUserInput): Promise<any> => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-Auth", auth);
    myHeaders.append("X-Session", session);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    const resp = await fetch(
        process.env.API_DOMAIN + `/metadata`,
        requestOptions,
    );
    const data = await resp.json();
    console.log(data)
    return data
};
