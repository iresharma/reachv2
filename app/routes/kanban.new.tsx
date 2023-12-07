import {Button} from "~/components/ui/button";
import kanbanCover from "~/assets/kanban-cover.png"
import {ActionArgs, LoaderArgs, V2_MetaFunction} from "@remix-run/node";
import {commitSession, getSession} from "~/session";
import {createKanban} from "~/services/api/kanban/createKanban";
import {redirect} from "react-router";

export const meta: V2_MetaFunction = () => {
    return [
        {title: "Kanban - New"},
        {name: "description", content: "Create new kanban board"},
    ];
};

export const loader = async ({ request }: LoaderArgs) => {
    const session = await getSession(request.headers.get("Cookie"));
    if(session.has("X-Board") && session.get("X-Board") !== "") {
        return redirect("/kanban")
    }
    return null
};

export const action = async ({ request }: ActionArgs) => {
    const session = await getSession(request.headers.get("Cookie"));
    const kanban = await createKanban({
        session: session.get("X-Session"),
        auth: session.get("X-Auth"),
        userAccount: session.get("X-UserAccount")
    })
    session.set("X-Board", kanban)
    return redirect("/kanban", {
        headers: {
            "Set-Cookie": await commitSession(session)
        }
    })
};

export default function NewKanbanPage() {
    return <div className="flex m-24">
        <div className="left m-auto w-[600px]">
            <h1 className="text-3xl text-[#9b9fb4]">
                Need to manage <span className="text-[#dedde3]">workload</span>,<br/> unable to track <span className="text-[#dedde3]">backlogs</span>?
            </h1>
            <h1 className="text-5xl text-purple-400 font-semibold mt-12 mb-4">Try our kanban system</h1>
            <p className="text-muted-foreground mb-4">Maintain a list of task to be done, ones in progress and things completed to analyze your productivity.</p>
            <form action="/kanban/new" method="POST">
                <Button>Get Started</Button>
            </form>
        </div>
        <div className="right hidden md:block">
            <img src={kanbanCover} className="h-[550px]"/>
        </div>
    </div>
}
