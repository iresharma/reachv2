import * as process from "process";

export type CreateUserAccountResponse = {
    id: string;
    name: string;
}

export const createUserAccount = async ({ name, session, auth }: any): Promise<CreateUserAccountResponse> => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-Session", session);
    myHeaders.append("X-Auth", auth);

    var urlencoded = new URLSearchParams();
    urlencoded.append("account_name", name);
    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    };
    const resp = await fetch(
        process.env.API_DOMAIN + `/userAccount`,
        requestOptions,
    );
    const data = await resp.json()
    console.log(data)
    return {
        id: data.user.Id,
        name: data.user.AccountName
    }
}
