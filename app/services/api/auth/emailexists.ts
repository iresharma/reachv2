export type EmailExistsInput = {
    email: string;
}

export type EmailExistsOutput = {
    exists: boolean
}

export const emailExists = async ({email}: EmailExistsInput): Promise<EmailExistsOutput> => {
    const resp = await fetch(`http://localhost:8080/user?email=${email}`);
    const data = await resp.json();
    return data.exists;
}
