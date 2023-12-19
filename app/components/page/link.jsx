import {DragDropContext, Draggable, Droppable, resetServerContext} from "react-beautiful-dnd";
import {useListState} from "@mantine/hooks";
import {GripVerticalIcon, Trash2Icon, BadgePlusIcon, PackagePlusIcon} from "lucide-react"
import {Pencil2Icon, ImageIcon} from "@radix-ui/react-icons"
import {useEffect, useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "~/components/ui/tooltip";
import {Button} from "~/components/ui/button";
import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";
import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import CreatePageLink from "~/services/api/page/createLink";
import updateSequence from "~/services/api/page/updateSequence";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {DialogClose} from "@radix-ui/react-dialog";

export default function PageLinks({links, revalidator}) {
    const [state, handlers] = useListState(links ?? []);
    useEffect(() => {
        if (JSON.stringify(links) !== JSON.stringify(state)) {
            updateSequence(state)
        }
    }, [links, state]);
    resetServerContext();

    function PageLink({link, index}) {
        const [edit, setEdit] = useState(false);
        return <Draggable key={link.Name} index={index} draggableId={link.Name}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="my-4"
                >
                    <div className="flex items-center p-2 rounded-xl shadow-2xl border-2 bg-black">
                        <div
                            {...provided.dragHandleProps}
                            className="mr-2"
                        >
                            <GripVerticalIcon/>
                        </div>
                        <article className="flex justify-between items-center w-full">
                            <div>
                                <h3 className={`text-xl font-bold ${edit ? "border border-primary ring-offset-2 ring-2" : ""}`}
                                    contentEditable={edit}
                                    onBlur={({currentTarget}) => handlers.setItem(index, {
                                        ...link,
                                        Name: currentTarget.innerText
                                    })}
                                >
                                    {link.Name}
                                </h3>
                                <span className="text-sm text-gray-600">Goes to: <code
                                    className={`${edit ? "border border-primary ring-offset-2 ring-2" : ""}`}
                                    contentEditable={edit}
                                    onBlur={({currentTarget}) => handlers.setItem(index, {
                                        ...link,
                                        Link: currentTarget.innerText
                                    })}>{link.Link}</code></span>
                            </div>
                            <div className="font-light flex space-x-4 mr-4">
                                <Pencil2Icon onClick={() => setEdit(!edit)} className="w-4 h-4 hover:text-primary"/>
                                <ImageIcon className="w-4 h-4 hover:text-primary"/>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Trash2Icon className="w-4 h-4 hover:text-destructive"/>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <h4 className="font-medium leading-none">Delete forever</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Are you sure you want to delete this link ?
                                                </p>
                                            </div>
                                            <div className="flex justify-between">
                                                <Button variant="secondary">Cancel</Button>
                                                <Button variant="destructive">Delete</Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </article>
                    </div>
                </div>
            )}
        </Draggable>
    }

    return <>
        <div className="links-list">
            <DragDropContext
                onDragEnd={async ({destination, source}) => handlers.reorder({
                    from: source.index,
                    to: destination?.index || 0,
                })
                }
            >
                <Droppable droppableId="dnd-list" direction="vertical">
                    {(provided1) => (
                        <div {...provided1.droppableProps} ref={provided1.innerRef}>
                            {state.map((val, index) => <PageLink key={index} link={val} index={index}/>)}
                            {provided1.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="flex w-full space-x-4 justify-between">
                <CreateLink revalidator={revalidator} sequence={links.length}/>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                className="w-full cursor-pointer border-dashed border-2 p-4 rounded-xl flex justify-center items-center">
                                <PackagePlusIcon className="w-4 h-4 mr-2"/>Add Widgets
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Coming Soon 🎉!!</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    </>
}

export function CreateLink({sequence, revalidator}) {
    const [name, setName] = useState("")
    const [link, setLink] = useState("");
    const createLink = async () => {
        await CreatePageLink({
            Name: name,
            Link: link,
            Icon: null,
            isSocialIcon: false,
            sequence
        })
        revalidator.revalidate()
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className="w-full cursor-pointer border-dashed border-2 p-4 rounded-xl flex justify-center items-center">
                    <BadgePlusIcon className="w-4 h-4 mr-2"/>Add Link
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new link</DialogTitle>
                    <DialogDescription>
                        Fill up the information below to
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Link
                        </Label>
                        <Input
                            id="username"
                            placeholder="https://iresharma.com"
                            className="col-span-3"
                            onChange={e => setLink(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={createLink}>Save changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
