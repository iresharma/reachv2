import {Button} from "~/components/ui/button";
import PageCover from "~/assets/page-cover.png";
import {ActionArgs, LoaderArgs, V2_MetaFunction} from "@remix-run/node";
import {commitSession, getSession} from "~/session";
import {redirect} from "react-router";
import CreatePage from "~/services/api/page/createPage";
import {ChromeIcon} from "lucide-react";

export const meta: V2_MetaFunction = () => {
    return [
        {title: "Page - New"},
        {name: "description", content: "Create new webpage for your brand"},
    ];
};

export const loader = async ({request}: LoaderArgs) => {
    const session = await getSession(request.headers.get("Cookie"));
    if (session.has("X-Page") && session.get("X-Page") !== "") {
        return redirect("/page")
    }
    return null
};

export const action = async ({request}: ActionArgs) => {
    const session = await getSession(request.headers.get("Cookie"));
    const body = await request.formData()
    const page = await CreatePage({
        session: {
            session: session.get("X-Session"),
            auth: session.get("X-Auth"),
            userAccount: session.get("X-UserAccount"),
        },
        route: body.get("route") ?? ""
    })
    session.set("X-Page", page.Id)
    return redirect("/page", {
        headers: {
            "Set-Cookie": await commitSession(session)
        }
    })
};

export default function NewKanbanPage() {
    return <div className="flex m-24">
        <div className="left m-auto w-[600px]">
            <h1 className="text-3xl text-[#9b9fb4]">
                <span className="text-[#dedde3]">Everything</span> you are,<br/> In a <span className="text-[#dedde3]">Single Link</span>
            </h1>
            <h1 className="text-5xl text-purple-400 font-semibold mt-12 mb-4">Try our Brand Page.</h1>
            <p className="text-muted-foreground mb-4">Share everything you create, curate and sell online. All from the
                one link in bio.</p>
            <form action="/page/new" method="POST" className="py-1 pl-6 pr-2 flex gap-3 items-center text-heading-3 shadow-lg shadow-box-shadow mt-8
                      border border-box-border bg-box-bg rounded-s-[250rem] rounded-e-full ease-linear focus-within:bg-body  focus-within:border-primary">
                        <span className="min-w-max pr-2 border-r border-box-border flex items-center">
                            <ChromeIcon className="w-6 h-6"/>
                            <span className="ml-2 text-muted-foreground text-lg">https://reachpages.com/</span>
                        </span>
                <input type="text" name="route" id="" placeholder="iresharma"
                       className="w-full py-3 outline-none bg-transparent"/>
                <Button className={"min-w-max text-white rounded-full"}>
                            <span className="hidden sm:flex relative z-[5]">
                                Get Started
                            </span>
                    <span className="flex sm:hidden relative z-[5]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
                                </svg>
                            </span>
                </Button>
            </form>
        </div>
        <div className="right hidden md:block">
            <img src={PageCover} className="h-[550px]"/>
        </div>
    </div>
}
