import {columns} from "~/components/kanban/columns";
import {DataTable} from "~/components/kanban/data-table";
import {Button} from "~/components/ui/button";
import {FileSpreadsheet} from "lucide-react";
import {getSession} from "~/session";
import {redirect, useLoaderData} from "react-router";
import {taskSchema} from "~/components/kanban/data/schema";
import {LinksFunction, LoaderArgs, V2_MetaFunction} from "@remix-run/node";
import {z} from "zod";
import unresetStyles from "~/styles/misc-components/unreset.css";
import downloadReport from "~/services/api/kanban/getDownloadReport"
import type {Item} from "~/components/kanban/KanbanInfo/root";
import getKanban from "~/services/api/kanban/getKanban";
import {secureLocalStorage} from "~/services/utils/secureLocalstorage";
import getKanbanItem from "~/services/api/kanban/getKanbanItem";
import {useEffect, useState} from "react";


export const meta: V2_MetaFunction = () => {
    return [
        {title: "Kanban"},
        {name: "description", content: "Kanban workspace "},
    ];
};

export const links: LinksFunction = () => {
    return [
        {
            rel: "stylesheet",
            href: unresetStyles
        }
    ];
}

export const loader = async ({request}: LoaderArgs) => {
    const session = await getSession(request.headers.get("Cookie"))
    if (typeof session.get("X-Board") === "undefined" || session.get("X-Board") === "") {
        return redirect("/kanban/new")
    }
    const kanbanData = await getKanban({page: 0, limit: 30, session})
    let kanbanItem = null;
    const id = new URL(request.url).searchParams.get('id');
    if (typeof id !== 'undefined' && id !== null && id !== "") {
        kanbanItem = await getKanbanItem({id: id ?? "", session});
    }
    return {
        items: z.array(taskSchema).parse(kanbanData.items),
        id: session.get("X-Board"),
        labels: kanbanData.labels,
        item: kanbanItem
    };
}

export default function TaskPage() {
    const loaderData = useLoaderData();
    const [activeItem, setActiveItem] = useState(null);
    // @ts-ignore
    const items = loaderData.items as Item[];
    // @ts-ignore
    const labels = loaderData.labels.map(item => ({value: item.Name, ...item}));
    useEffect(() => {
        console.log(loaderData)
        // @ts-ignore
        if(loaderData.item !== null)  {
            // @ts-ignore
            setActiveItem(loaderData.item);
        }
        // @ts-ignore
        if (loaderData.id !== null) {
            // @ts-ignore
            localStorage.setItem("X-Board", loaderData.id)
        }

    }, []);
    const download = async () => {
        const downloadLink = await downloadReport({
            session: {
                UserAccount: secureLocalStorage.getItem("X-UserAccount")!,
                Session: secureLocalStorage.getItem("X-Session")!,
                Auth: secureLocalStorage.getItem("X-Auth")!,
                Board: secureLocalStorage.getItem("X-Board")!,
            }
        });
        const data = await fetch(downloadLink)
        const blob = await data.blob()
        const objectUrl = URL.createObjectURL(blob)

        const filename = "KanbanReport" + new Date();

        const link = document.createElement('a')

        link.setAttribute('href', objectUrl)
        link.setAttribute('download', filename)
        link.style.display = 'none'

        document.body.appendChild(link)

        link.click()

        document.body.removeChild(link)
    }

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
                        <Button
                            className="bg-[#1D6F42] hover:bg-[#1D6F42] text-white hover:border-2 hover:border-[#fff] transition-all"
                            onClick={download}>
                            <FileSpreadsheet className="w-4 h-4 mr-2"/>
                            Download Report
                        </Button>
                    </div>
                </div>
                <DataTable activeItem={activeItem} labels={labels} data={items} columns={columns}/>
            </div>
        </>
    );
}
