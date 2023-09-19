import {Button} from "~/components/ui/button";
import kanbanCover from "~/assets/kanban-cover.png"

export default function NewKanbanPage() {
    return <div className="flex m-24">
        <div className="left m-auto w-[600px]">
            <h1 className="text-3xl text-[#9b9fb4]">
                Need to manage <span className="text-[#dedde3]">workload</span>,<br/> unable to track <span className="text-[#dedde3]">backlogs</span>?
            </h1>
            <h1 className="text-5xl text-purple-400 font-semibold mt-12 mb-4">Try our kanban system</h1>
            <p className="text-muted-foreground mb-4">Maintain a list of task to be done, ones in progress and things completed to analyze your productivity.</p>
            <Button>Get Started</Button>
        </div>
        <div className="right hidden md:block">
            <img src={kanbanCover} className="h-[550px]"/>
        </div>
    </div>
}
