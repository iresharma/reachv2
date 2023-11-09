export type Meta = {
    Id:         string;
    Value:      string;
    Type:       string;
    TemplateId: string;
}

export type Template = {
    Id:             string;
    Name:           string;
    Desc:           string;
    Image:          string;
    Button:         string;
    Background:     string;
    Font:           string;
    FontColor:      string;
    MetaTags:       Meta[];
    PageId:         string;
    SocialPosition: string;
}

export type PageLinks = {
    Id:     string;
    Name:   string;
    Link:   string;
    Icon:   string;
    Social: Boolean;
    PageId: string;
}

export type Page = {
    Id:            string;
    Route:         string;
    Template:      Template;
    UserAccountId: string;
    Links:         PageLinks[];
}

export default async function getPage(route: string): Promise<Page> {
    const resp = await fetch("http://localhost:8080/page/iresharma")
    const data = await resp.json();
    return data as Page;
}
