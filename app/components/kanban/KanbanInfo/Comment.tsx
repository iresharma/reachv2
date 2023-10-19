import Tiptap from "~/components/misc/tiptap";
import {useState} from "react";
import {Card} from "~/components/ui/card";
import {Avatar, AvatarImage} from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import {TipTapRenderer} from "~/components/misc/tiptapUtils";
import addComment from "~/services/api/kanban/addComment";
import {secureLocalStorage} from "~/services/utils/secureLocalstorage";
import {useRevalidator} from "@remix-run/react";

type CommentBoxProps = { item_id: string; addCommentToState: (data: object) => void };

export const CommentBox = ({item_id, addCommentToState}: CommentBoxProps) => {
    const [comment, setComment] = useState("{}");
    const revalidator = useRevalidator();
    const submit = async (content: string) => {
        const data = await addComment({
            session: {
                UserAccount: secureLocalStorage.getItem("X-UserAccount")!,
                Session: secureLocalStorage.getItem("X-Session")!,
                Auth: secureLocalStorage.getItem("X-Auth")!,
                Board: secureLocalStorage.getItem("X-Board")!,
            },
            message: content,
            item: item_id,
        })
        addCommentToState(data);
        setComment("");
        revalidator.revalidate();
    }
    return <>
        <Tiptap content={comment} showButton={true} buttonAction={submit} onChange={setComment} />
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
            <TipTapRenderer content={message} />
        </Card>
}
