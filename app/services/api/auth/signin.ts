import {getSession} from "~/session";
import {getUserAccount} from "~/services/api/auth/getUserAccount";

export type Session = {
    session: string;
    auth: string;
    perm: string;
};

export type SignInError = {
    error: string;
    type: "warning" | "error";
};

export type SignInResp = {
    session: {[key: string]: any }
}

export type SignInInput = {
    email: string;
    password: string;
};

export const signIn = async ({
                                 email,
                                 password,
                             }: SignInInput): Promise<SignInError | SignInResp> => {
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
        `http://localhost:8080/session`,
        requestOptions,
    );
    const session = await getSession();
    if (resp.status !== 200) {
        session.unset("X-Session");
        session.unset("X-Auth");
        session.unset("X-Perm");
        return {
            type: resp.status.toString()[0] === "4" ? "warning" : "error",
            error: await resp.text(),
        };
    }
    const data = await resp.json();
    session.set("X-Session", data["session"]);
    session.set("X-Auth", data["auth"]);
    session.set("X-Perm", data["perm"]);
    const {Id, Name, BoardId, BucketId, PageId} = await getUserAccount({auth: data["auth"], session: data["session"]});
    session.set("X-UserAccount", Id);
    session.set("X-UserAccount-Name", Name);
    session.set("X-Board", BoardId);
    session.set("X-Bucket", BucketId);
    session.set("X-Page", PageId);
    return {
        session: session
    }
};
