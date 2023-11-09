import {DragDropContext, Draggable, Droppable, resetServerContext} from "react-beautiful-dnd";
import {useListState} from "@mantine/hooks";
import {GripVerticalIcon, Trash2Icon, BadgePlusIcon, PackagePlusIcon, Link} from "lucide-react"
import {Pencil2Icon, ImageIcon} from "@radix-ui/react-icons"
import {useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "~/components/ui/tooltip";
import {Button} from "~/components/ui/button";

export default function PageLinks({links}) {
    const [state, handlers] = useListState(links ?? []);
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
                            { ...provided.dragHandleProps }
                            className="mr-2"
                        >
                            <GripVerticalIcon />
                        </div>
                        <article className="flex justify-between items-center w-full">
                            <div>
                                <h3 className={`text-xl font-bold ${edit ? "border" : ""}`}
                                    contentEditable={edit}
                                    onBlur={({currentTarget}) => handlers.setItem(index, {...link, Name: currentTarget.innerText})}
                                >
                                    {link.Name}
                                </h3>
                                <span className="text-sm text-gray-600">Goes to: <code className={`${edit ? "border" : ""}`} contentEditable={edit}>{link.Link}</code></span>
                            </div>
                            <div className="font-light flex space-x-4 mr-4">
                                <Pencil2Icon onClick={() => setEdit(!edit)} className="w-4 h-4 hover:text-primary" />
                                <ImageIcon className="w-4 h-4 hover:text-primary" />
                                <Trash2Icon className="w-4 h-4 hover:text-destructive" />
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
                onDragEnd={({ destination, source }) =>
                    handlers.reorder({
                        from: source.index,
                        to: destination?.index || 0,
                    })
                }
            >
                <Droppable droppableId="dnd-list" direction="vertical">
                    {(provided1) => (
                        <div {...provided1.droppableProps} ref={provided1.innerRef}>
                            {state.map((val, index) => <PageLink key={index} link={val} index={index} />)}
                            {provided1.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div className="flex w-full space-x-4 justify-between">
                <div className="w-full cursor-pointer border-dashed border-2 p-4 rounded-xl flex justify-center items-center">
                    <BadgePlusIcon className="w-4 h-4 mr-2" />Add Link
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="w-full cursor-pointer border-dashed border-2 p-4 rounded-xl flex justify-center items-center">
                                <PackagePlusIcon className="w-4 h-4 mr-2" />Add Widgets
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
