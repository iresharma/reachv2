import {
    Dialog,
    DialogContent,
    DialogFooter
} from "~/components/ui/dialog";
import {Button} from "~/components/ui/button";
import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";
import {Textarea} from "~/components/ui/textarea";
import * as React from "react";
import {
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon
} from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import Tiptap from "~/components/misc/tiptap";
import "~/styles/kanban/create.css"
import {Badge} from "~/components/ui/badge";

export default function CreateItem({ open, close, labels }: { open: boolean; close: () => void; labels: any[] }) {

    const textAreaHeight = (e: any) => {
        e.target.style.height = "inherit";
        e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
    };

    const status_mapping = (val: number) => {
        switch (val) {
            case 0:
                return <span
                    className="ml-2 cursor-pointer inline-flex flex-row items-center text-blue-400"><CircleIcon
                    className="mr-2"/> <span>Todo</span></span>
            case 1:
                return <span
                    className="ml-2 cursor-pointer inline-flex flex-row items-center text-yellow-400"><StopwatchIcon
                    className="mr-2"/> <span>Progress</span></span>
            case 2:
                return <span
                    className="ml-2 cursor-pointer inline-flex flex-row items-center text-green-400"><CheckCircledIcon
                    className="mr-2"/> <span>Done</span></span>
            case 3:
                return <span
                    className="ml-2 cursor-pointer inline-flex flex-row items-center text-muted-foreground line-through"><CrossCircledIcon
                    className="mr-2"/> <span>Canceled</span></span>
            case 4:
                return <span
                    className="ml-2 cursor-pointer inline-flex flex-row items-center text-red-400"><QuestionMarkCircledIcon
                    className="mr-2"/> <span>Backlog</span></span>
        }
    };

    return <>
        <Dialog open={open}>
            <DialogContent className="h-[60vh] flex flex-col justify-between max-w-[60vw] overflow-y-scroll">
                <div className="flex flex-col h-full">
                    <Textarea
                        onKeyDown={textAreaHeight}
                        className="resize-none border-none h-[1rem] text-2xl font-bold p-0 m-0 focus-visible:ring-0"
                        placeholder="Create a title"
                    />
                    <div className="grid items-center gap-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
                        <div className="flex items-center">
                            <Label htmlFor="username" className="text-right mr-4">
                                Status
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    {status_mapping(0)}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuGroup>
                                        {[0, 1, 2, 3, 4].map(status => <DropdownMenuItem key={status} >
                                            {status_mapping(status)}
                                        </DropdownMenuItem>)}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="flex items-center">
                            <Label htmlFor="username" className="text-right mr-4">
                                Label
                            </Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <span
                                        style={{backgroundColor: `#${labels[0].Color}`}}
                                        className="rounded-2xl py-1 px-4 text-xs"
                                    >
                                        {labels[0].Name}
                                    </span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Label</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuGroup>
                                        {labels.map(label => <DropdownMenuItem key={label.Id}>
                                            <Badge
                                                variant="outline"
                                                style={{backgroundColor: `#${label.Color}`}}
                                            >
                                                {label.Name}
                                            </Badge>
                                        </DropdownMenuItem>)}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
                <pre className="text-foreground dark:text-muted-foreground">
                    Add links feature.
                </pre>
                <Tiptap content={""} />
                <DialogFooter>
                    <Button type="submit" onClick={close}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}
