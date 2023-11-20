export type EmailExistsInput = {
    email: string;
}

export type EmailExistsOutput = {
    exists: boolean
}

export const emailExists = async ({email}: EmailExistsInput): Promise<EmailExistsOutput> => {
    const resp = await fetch(window.ENV.API_DOMAIN + `/user?email=${email}`);
    const data = await resp.json();
    return data.exists;
}
