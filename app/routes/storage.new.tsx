import {Button} from "~/components/ui/button";
import storageCover from "~/assets/storage-cover.png";
import GDrive from "~/assets/icons/Gdrive.png";
import DropBox from "~/assets/icons/Dropbox.png";
import {LoaderArgs, V2_MetaFunction} from "@remix-run/node";
import {getSession} from "~/session";
import {redirect} from "react-router";

export const meta: V2_MetaFunction = () => {
    return [
        {title: "Storage - New"},
        {name: "description", content: "Create new storage space"},
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
                Fully managed <span className="text-[#dedde3]">& Secure</span>,<br/> <span className="text-[#dedde3]">Umlimited</span> storage for days.
            </h1>
            <h1 className="text-5xl text-purple-400 font-semibold mt-12 mb-4">Try Collaborative Storage.</h1>
            <p className="text-muted-foreground mb-4">No more worry about storage, no more multi hard drive setup. Now you get your whole fully managed cloud storage sever.</p>
            <form className="flex flex-row gap-6" action="/storage/new" method="POST">
                <Button variant="secondary">
                    Import data
                    <img src={GDrive} alt="" className="h-6 ml-1"/>
                    <img src={DropBox} alt="" className="h-6 ml-1"/>
                </Button>
                <Button>Get Started</Button>
            </form>
        </div>
        <div className="right hidden md:block">
            <img src={storageCover} className="h-[550px]"/>
        </div>
    </div>
}
