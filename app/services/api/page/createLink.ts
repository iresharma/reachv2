export type CreateLinkInput = {
    Name: string;
    Link: string;
    Icon?: string;
    isSocialIcon?: boolean;
    sequence: number;
}

export default async function CreatePageLink({Name, Link, Icon, isSocialIcon, sequence}: CreateLinkInput) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-UserAccount", localStorage.getItem("X-UserAccount") ?? "");
    myHeaders.append("X-Session", localStorage.getItem("X-Session") ?? "");
    myHeaders.append("X-Auth", localStorage.getItem("X-Auth") ?? "");
    myHeaders.append("X-Page", localStorage.getItem("X-Page") ?? "");

    var urlencoded = new URLSearchParams();
    urlencoded.append("Name", Name);
    urlencoded.append("Link", Link);
    urlencoded.append("Icon", Icon ?? "");
    urlencoded.append("isSocialIcon", isSocialIcon ? String(isSocialIcon) : "false");
    urlencoded.append("sequence", sequence.toString());

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded
    };

    const resp = await fetch(
        "http://localhost:8080/page/links",
        requestOptions
    );
    const data = await resp.json()
    return data;
}
