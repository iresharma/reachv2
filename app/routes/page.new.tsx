import {Button} from "~/components/ui/button";
import PageCover from "~/assets/page-cover.png";
import {LoaderArgs, V2_MetaFunction} from "@remix-run/node";
import {getSession} from "~/session";
import {redirect} from "react-router";

export const meta: V2_MetaFunction = () => {
    return [
        {title: "Page - New"},
        {name: "description", content: "Create new webpage for your brand"},
    ];
};

export const loader = async ({ request }: LoaderArgs) => {
    const session = await getSession(request.headers.get("Cookie"));
    if(session.has("X-Storage")) {
        return redirect("/storage")
    }
    return null
};

// export const action = async ({ request }: ActionArgs) => {
//     const session = await getSession(request.headers.get("Cookie"));
//     const kanban = await createKanban({
//         session: session.get("X-Session"),
//         auth: session.get("X-Auth"),
//         userAccount: session.get("X-UserAccount")
//     })
//     session.set("X-Board", kanban)
//     return redirect("/kanban", {
//         headers: {
//             "Set-Cookie": await commitSession(session)
//         }
//     })
// };

export default function NewKanbanPage() {
    return <div className="flex m-24">
        <div className="left m-auto w-[600px]">
            <h1 className="text-3xl text-[#9b9fb4]">
                <span className="text-[#dedde3]">Everything</span> you are,<br/> In a <span className="text-[#dedde3]">Single Link</span>
            </h1>
            <h1 className="text-5xl text-purple-400 font-semibold mt-12 mb-4">Try our Brand Page.</h1>
            <p className="text-muted-foreground mb-4">Share everything you create, curate and sell online. All from the
                one link in bio.</p>
            <form className="flex flex-row gap-6" action="/storage/new" method="POST">
                <Button>Get Started</Button>
            </form>
        </div>
        <div className="right hidden md:block">
            <img src={PageCover} className="h-[550px]"/>
        </div>
    </div>
}
