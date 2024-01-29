import * as process from "process";

export type SignupInput = {
    email: string;
    password: string;
}

export const signup = async ({ email, password }: SignupInput) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    };
    const resp = await fetch(
        process.env.API_DOMAIN + `/user`,
        requestOptions,
    );
    console.log(resp)
    return resp.status
}
