export const emailValidate = (auth: string) => {
    const headers = new Headers();
    headers.set("X-Auth", auth)

    fetch(process.env.API_DOMAIN + "/user/verify/create", {headers})
}
