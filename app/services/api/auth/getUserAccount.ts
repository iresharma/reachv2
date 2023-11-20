import {getSession} from "~/session";
import * as process from "process";

export type GetUserAccountInput = {
    auth: string;
    session: string;
};

export const getUserAccount = async ({auth, session}: GetUserAccountInput): Promise<any> => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-Auth", auth);
    myHeaders.append("X-Session", session);

    var requestOptions = {
        method: "GET",
        headers: myHeaders,
    };
    const resp = await fetch(
        process.env.API_DOMAIN + `/user/userAccount`,
        requestOptions,
    );
    const data = await resp.json();
    console.log(data)
    return data.userAccount
};
