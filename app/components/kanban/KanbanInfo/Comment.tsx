import Tiptap from "~/components/tiptap";
import {useState} from "react";
import {Card, CardHeader} from "~/components/ui/card";
import {Avatar, AvatarImage} from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {ChevronRight} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";

export const CommentBox = () => {
    const [comment, setComment] = useState("{}");
    const submit = async (content: string) => {}
    return <>
        <Tiptap content={comment} showButton={true} buttonAction={submit} />
    </>
}

export const CommentDisplay = ({message}: {message: string}) => {
        return <Card className="mr-6 pb-2 my-4">
            <div className="flex flex-row justify-between items-center px-2 py-2 border-b border-zinc-900 dark:border-zinc-700">
                <div className="flex flex-row">
                    <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop" />
                    </Avatar>
                    <span className="font-semibold">
                        Iresharma
                    </span>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                            >
                                <DotsHorizontalIcon className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Make a copy</DropdownMenuItem>
                            <DropdownMenuItem>Favorite</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                                {/*<DropdownMenuSubContent>*/}
                                {/*  <DropdownMenuRadioGroup value={task.label}>*/}
                                {/*    {labels.map((label) => (*/}
                                {/*      <DropdownMenuRadioItem key={label.value} value={label.value}>*/}
                                {/*        {label.label}*/}
                                {/*      </DropdownMenuRadioItem>*/}
                                {/*    ))}*/}
                                {/*  </DropdownMenuRadioGroup>*/}
                                {/*</DropdownMenuSubContent>*/}
                            </DropdownMenuSub>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                Delete
                                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <p className="text-sm font-normal p-4 px-2">
                {message}
            </p>
        </Card>
}
