import {LinksFunction, LoaderArgs, V2_MetaFunction} from "@remix-run/node";
import {getSession} from "~/session";
import {redirect, useLoaderData} from "react-router";
import getPage, {Page} from "~/services/api/page/getPage";
import {Button} from "~/components/ui/button";
import {Globe2Icon} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/ui/tabs";
import PageLink from "~/components/page/link";
import Style from "~/components/page/style";
import buttonStyles from "~/styles/page/buttons.css";
import {useRevalidator} from "@remix-run/react";
import Analytics from "~/components/page/analytics";

export const links: LinksFunction = () => {
    return [
        {
            rel: "stylesheet",
            href: buttonStyles
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Agbalumo&family=Caveat&family=Dancing+Script&family=Edu+TAS+Beginner&family=Josefin+Sans&family=Oswald&family=Playfair+Display&family=Roboto+Condensed&family=Roboto+Slab&family=Shadows+Into+Light&display=swap"
        },
        {
            rel: "preconnect",
            crossOrigin: "true",
            href: "https://fonts.gstatic.com"
        },
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com"
        }
    ];
}

export const meta: V2_MetaFunction = () => {
    return [
        {title: "Page"},
        {name: "description", content: "Kanban workspace "},
    ];
};

export const loader = async ({request}: LoaderArgs) => {
    const session = await getSession(request.headers.get("Cookie"))
    if (typeof session.get("X-Page") === "undefined" || session.get("X-Page") === "") {
        return redirect("/page/new")
    }
    const pageData = await getPage(session.get("X-Page"));
    return {
        page: pageData
    };
}

export default function PageView() {
    // @ts-ignore
    const {page}: {page: Page} = useLoaderData();
    const revalidator = useRevalidator();
    return <>
        <div className="h-full flex-1 flex-col space-y-8 flex">
            <div className="flex items-center justify-between space-y-2 border-b p-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Brand Page!
                    </h2>
                    <p className="text-muted-foreground">
                        Use this to setup your brand page and analyse traffic.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button>
                        <Globe2Icon className="w-4 h-4 mr-2"/>
                        Visit
                    </Button>
                </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
                <div className="p-10 py-6 relative flex justify-center">
                    {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
                    <iframe src="https://reach-page-server.vercel.app/iresharma" className="rounded-xl border-4 h-[70vh] fixed"></iframe>
                </div>
                <div className="p-4">
                    <Tabs defaultValue="links" className="w-[60vw]">
                        <TabsList>
                            <TabsTrigger value="links">Links</TabsTrigger>
                            <TabsTrigger value="styles">Styles</TabsTrigger>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        </TabsList>
                        <TabsContent value="links">
                            <PageLink revalidator={revalidator} links={page.Links.sort((a, b) => a.Sequence - b.Sequence)} />
                        </TabsContent>
                        <TabsContent value="styles">
                            <Style />
                        </TabsContent>
                        <TabsContent value="analytics">
                            <Analytics />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    </>
}
