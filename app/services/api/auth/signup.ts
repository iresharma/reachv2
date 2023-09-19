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
        `http://localhost:8080/user`,
        requestOptions,
    );
    console.log(resp.status)
    return resp.status
}
