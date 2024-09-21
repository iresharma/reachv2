import {LoaderArgs} from "@remix-run/node";
import {getSession} from "~/session";
import {redirect} from "react-router";
import {FileExplorerComponent} from "~/components/file-explorer";
import {Button} from "~/components/ui/button";
import {FileSpreadsheet} from "lucide-react";

export const loader = async ({request}: LoaderArgs) => {
    const session = await getSession(request.headers.get("Cookie"))
    if (typeof session.get("X-Bucket") === "undefined" || session.get("X-Bucket") === "") {
        return redirect("/storage/new")
    }

    return {};
}

export default function StorageView() {
    return <>
        <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Track Progress!
                    </h2>
                    <p className="text-muted-foreground">
                        Take a charge of all your media and look at your on going projects.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        className="bg-[#1D6F42] hover:bg-[#1D6F42] text-white hover:border-2 hover:border-[#fff] transition-all">
                        <FileSpreadsheet className="w-4 h-4 mr-2"/>
                        Download Report
                    </Button>
                </div>
            </div>
            <FileExplorerComponent />
        </div>
    </>
}
