import {getSession} from "~/session";
import {getUserAccount} from "~/services/api/auth/getUserAccount";
import * as process from "process";

export type Session = {
    session: string;
    auth: string;
    perm: string;
};

export type SignInInput = {
    email: string;
    password: string;
    signup?: boolean
};

export const signIn = async ({
                                 email,
                                 password,
                                 signup,
                             }: SignInInput): Promise<any> => {
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
        process.env.API_DOMAIN + `/session`,
        requestOptions,
    );
    const session = await getSession();
    if (resp.status !== 200) {
        console.log("here")
        session.unset("X-Session");
        session.unset("X-Auth");
        session.unset("X-Perm");
        return resp;
    }
    const data = await resp.json();
    session.set("X-Session", data["session"]);
    session.set("X-Auth", data["auth"]);
    session.set("X-Perm", data["perm"]);
    if (signup) {
        return {session}
    }
    const {Id, Name, BoardId, BucketId, PageId} = await getUserAccount({auth: data["auth"], session: data["session"]});
    session.set("X-UserAccount", Id);
    session.set("X-UserAccount-Name", Name);
    session.set("X-Board", BoardId);
    session.set("X-Bucket", BucketId);
    session.set("X-Page", PageId);
    return {session}
};
