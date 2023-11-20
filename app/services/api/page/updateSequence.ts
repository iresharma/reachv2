import updateLink from "./updateLink";

export default async function updateSequence(links: any[]) {
    const promises: any[] = [];
   links.forEach((val, index) => promises.push(updateLink({...val, sequence: index})))
    await Promise.all(promises);
}
