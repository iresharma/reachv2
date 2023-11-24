import {Textarea} from "~/components/ui/textarea";
import {useEffect, useState} from "react";
import Tiptap from "~/components/misc/tiptap";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "~/components/ui/table";
import {Badge} from "~/components/ui/badge";
import {Button} from "~/components/ui/button";
import {BadgePlus, Copy, Trash2Icon} from "lucide-react";
import {CommentBox, CommentDisplay} from "~/components/kanban/KanbanInfo/Comment";
import * as React from "react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import {
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon
} from "@radix-ui/react-icons";
import updateItem from "~/services/api/kanban/updateItem";
import {useRevalidator} from "@remix-run/react";
import {secureLocalStorage} from "~/services/utils/secureLocalstorage";
import {useClipboard} from "@mantine/hooks";
import {toast} from "~/components/ui/use-toast";

export type Comment = {
    Id: string;
    UserId: string;
    Message: string;
}

export type Item = {
    Title: string,
    Status: number,
    Id: string,
    Desc: string,
    Label: {
        Id: string;
        Color: string,
        Name: string
    },
    Links: string;
    Comments?: Comment[];
}

export default function KanbanSheet({item, createItem}: { item: Item, createItem?: boolean }) {
    const [stateItem, setStateItem] = useState(item);
    const clipboard = useClipboard({ timeout: 500 });
    const copy = () => {
        clipboard.copy(window.ENV.API_DOMAIN + `/kanban?id=${item.Id}`)
        toast({
            title: "Copied !"
        })
    }
    const revalidator = useRevalidator();
    useEffect(() => {
        const update = async () => {
            if (JSON.stringify(stateItem) !== JSON.stringify(item)) {
                const out = await updateItem({
                    session: {
                        UserAccount: secureLocalStorage.getItem("X-UserAccount")!,
                        Session: secureLocalStorage.getItem("X-Session")!,
                        Auth: secureLocalStorage.getItem("X-Auth")!,
                        Board: secureLocalStorage.getItem("X-Board")!,
                    }, item: stateItem
                })
                if(out) revalidator.revalidate()
            }
        };
        if(createItem) update();
    }, [stateItem]);
    const status_mapping = (val: number) => {
        switch (val) {
            case 0:
                return <span
                    className="ml-2 cursor-pointer inline-flex flex-row items-stretch text-blue-400"><CircleIcon
                    className="mr-2"/> <span>Todo</span></span>
            case 1:
                return <span
                    className="ml-2 cursor-pointer inline-flex flex-row items-stretch text-yellow-400"><StopwatchIcon
                    className="mr-2"/> <span>Progress</span></span>
            case 2:
                return <span
                    className="ml-2 cursor-pointer inline-flex flex-row items-stretch text-green-400"><CheckCircledIcon
                    className="mr-2"/> <span>Done</span></span>
            case 3:
                return <span
                    className="ml-2 cursor-pointer inline-flex flex-row items-stretch text-muted-foreground line-through"><CrossCircledIcon
                    className="mr-2"/> <span>Canceled</span></span>
            case 4:
                return <span
                    className="ml-2 cursor-pointer inline-flex flex-row items-stretch text-red-400"><QuestionMarkCircledIcon
                    className="mr-2"/> <span>Backlog</span></span>
        }
    };
    const textAreaHeight = (e: any) => {
        e.target.style.height = "inherit";
        e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
    };
    const addLink = () => {
        const links = stateItem.Links !== "" ? JSON.parse(stateItem.Links) : {};
        links["key"] = "value";
        const stringify = JSON.stringify(links);
        console.log(stringify)
        setStateItem({...stateItem, Links: stringify})
    }

    const addCommentToState = (data: Comment) => {
        if(stateItem.Comments === undefined) setStateItem({...stateItem, Comments: [data]})
        else setStateItem({...stateItem, Comments: [...stateItem.Comments, data]})
    }

    return (
        <div className="overflow-auto">
            <div className="border-b-2 border-zinc-200 dark:border-zinc-900 p-6">
                <h5 className="text-gray-500">{item.Id}</h5>
                <Textarea
                    onKeyDown={textAreaHeight}
                    className="resize-none border-none h-[1rem] text-2xl font-bold p-0 m-0 focus-visible:ring-0"
                    value={stateItem.Title}
                    placeholder="Create a title"
                    onChange={({target}) => setStateItem({...stateItem, Title: target.value})}
                />
                <p className="text-xs text-muted-foreground">
                    This task is currently in{" "}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            {status_mapping(stateItem.Status)}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Status</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                {[0, 1, 2, 3, 4].map(status => <DropdownMenuItem key={status}
                                                                                 onClick={() => setStateItem({
                                                                                     ...stateItem,
                                                                                     Status: status
                                                                                 })}>
                                    {status_mapping(status)}
                                </DropdownMenuItem>)}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </p>
            </div>
            <div style={{gridTemplateColumns: "3fr 1fr"}} className="grid p-6">
                <div className="h-[80vh] overflow-y-scroll">
                    <Tiptap content={stateItem.Desc}
                            onChange={(content) => setStateItem({...stateItem, Desc: content})}/>
                    { !createItem && <>
                        <h3 className="text-xl mt-8 mb-4">Comments</h3>
                        {stateItem.Comments?.map((val, index) => <CommentDisplay message={JSON.parse(val.Message)} key={index}/>)}
                        <CommentBox item_id={stateItem.Id} addCommentToState={addCommentToState}/>
                        <div className="h-[10vh]"/>
                    </> }
                    { createItem && <Button className="mt-4">Create Issue</Button> }
                </div>
                <div className="ml-4">
                    <Table className="mt-2">
                        <TableBody>
                            <TableRow className="border-0">
                                <TableCell className="p-2 font-bold ">Label</TableCell>
                                <TableCell className="p-2 w-8/12">
                                    <Badge
                                        variant="outline"
                                        style={{backgroundColor: `#${item.Label.Color}`}}
                                    >
                                        {stateItem.Label.Name}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            {stateItem.Links !== "" && Object.keys(JSON.parse(stateItem.Links)).map((val, index) => (
                                <TableRow className="border-0" key={index}>
                                    <TableCell className="p-2 font-bold ">{val}</TableCell>
                                    <TableCell className="p-2 w-8/12">{JSON.parse(item.Links)[val]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Button variant="ghost" size="sm" className="pl-2 flex w-full justify-start items-center" onClick={addLink}>
                        <BadgePlus className="mr-2 h-4 w-4"/>
                        Add New link
                    </Button>
                    <Button
                        variant="ghost"
                        className="pl-2 flex w-full justify-start items-center"
                        onClick={copy}
                    >
                        <Copy className="text-xs mr-2 h-[15px] w-[15px]"/>
                        Copy link
                    </Button>
                    <Button
                        variant="ghost"
                        className="pl-2 text-red-600 w-full flex justify-start items-center hover:bg-red-500 hover:bg-opacity-40"
                    >
                        <Trash2Icon className="text-xs mr-2 h-[15px] w-[15px]"/>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}
