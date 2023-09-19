import { columns } from "~/components/kanban/columns";
import { DataTable } from "~/components/kanban/data-table";
import { Button } from "~/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import {getSession} from "~/session";
import {redirect} from "react-router";

export const loader = async ({ request }) => {
    const session = await getSession(request.headers.get("Cookie"))
    if(typeof session.get("X-Kanban") === "undefined") {
        return redirect("/kanban/new")
    }
    return {}
}

export default function TaskPage() {
    const [items, _] = useState<any[]>([]);

    return (
        <>
            <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Track Progress!
                        </h2>
                        <p className="text-muted-foreground">
                            Use this to follow kanban principles and excel in timelines.
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button className="bg-[#1D6F42] text-white hover:text-[#1D6F42] hover:border-2 hover:border-[#1D6F42] transition-all">
                            <FileSpreadsheet className="w-4 h-4 mr-2" />
                            Download Report
                        </Button>
                    </div>
                </div>
                <DataTable data={items} columns={columns} />
            </div>
        </>
    );
}
