import {getSession} from "~/session";

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
        `http://localhost:8080/user/userAccount`,
        requestOptions,
    );
    const data = await resp.json();
    console.log(data)
    return data.userAccount
};
