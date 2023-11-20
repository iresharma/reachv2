import type {CreateLinkInput} from "~/services/api/page/createLink";

export default async function UpdateLink(link: CreateLinkInput) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-UserAccount", localStorage.getItem("X-UserAccount") ?? "");
    myHeaders.append("X-Session", localStorage.getItem("X-Session") ?? "");
    myHeaders.append("X-Auth", localStorage.getItem("X-Auth") ?? "");
    myHeaders.append("X-Page", localStorage.getItem("X-Page") ?? "");

    var urlencoded = new URLSearchParams();
    urlencoded.append("Name", link.Name);
    urlencoded.append("Link", link.Link);
    urlencoded.append("Icon", link.Icon ?? "");
    urlencoded.append("isSocialIcon", link.isSocialIcon ? String(link.isSocialIcon) : "false");
    urlencoded.append("sequence", link.sequence.toString());

    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: urlencoded
    };

    const resp = await fetch(
        window.ENV.API_DOMAIN + "/page/links",
        requestOptions
    );
    const data = await resp.json()
    return data;
}
