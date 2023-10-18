import { Textarea } from "~/components/ui/textarea";
import { useState } from "react";
import Tiptap from "~/components/tiptap";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
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

export default function KanbanSheet({ item }: { item: Item }) {
  const [title, setTitle] = useState(item.Title);
  const status_mapping = (val: number) => {
    switch (val) {
      case 0: return <span className="ml-2 cursor-pointer inline-flex flex-row items-stretch text-blue-400"><CircleIcon  className="mr-2"/> <span>Todo</span></span>
      case 1: return <span className="ml-2 cursor-pointer inline-flex flex-row items-stretch text-yellow-400"><StopwatchIcon  className="mr-2"/> <span>Progress</span></span>
      case 2: return <span className="ml-2 cursor-pointer inline-flex flex-row items-stretch text-green-400"><CheckCircledIcon  className="mr-2"/> <span>Done</span></span>
      case 3: return <span className="ml-2 cursor-pointer inline-flex flex-row items-stretch text-muted-foreground line-through"><CrossCircledIcon  className="mr-2"/> <span>Canceled</span></span>
      case 4: return <span className="ml-2 cursor-pointer inline-flex flex-row items-stretch text-red-400"><QuestionMarkCircledIcon  className="mr-2"/> <span>Backlog</span></span>
    }
  };
  const textAreaHeight = (e: any) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };
  return (
    <div className="overflow-auto">
      <div className="border-b-2 border-zinc-200 dark:border-zinc-900 p-6">
        <h5 className="text-gray-500">{item.Id}</h5>
        <Textarea
          onKeyDown={textAreaHeight}
          className="resize-none border-none h-[1rem] text-2xl font-bold p-0 m-0 focus-visible:ring-0"
          value={title}
          placeholder="Create a title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <p className="text-xs text-muted-foreground">
          This task is currently in{" "}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {status_mapping(item.Status)}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                  {[0,1,2,3,4].map(status => <DropdownMenuItem key={status}>
                    {status_mapping(status)}
                  </DropdownMenuItem>)}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </p>
      </div>
      <div style={{ gridTemplateColumns: "3fr 1fr" }} className="grid p-6">
        <div className="h-[80vh] overflow-y-scroll">
          <Tiptap content={item.Desc} />
          <h3 className="text-xl mt-8 mb-4" >Comments</h3>
          {item.Comments?.map((val, index) => <CommentDisplay message={val.Message} />)}
          <CommentBox />
          <div className="h-[10vh]" />
        </div>
        <div className="ml-4">
          <Table className="mt-2">
            <TableBody>
              <TableRow className="border-0">
                <TableCell className="p-2 font-bold ">Label</TableCell>
                <TableCell className="p-2 w-8/12">
                  <Badge
                    variant="outline"
                    style={{ backgroundColor: `#${item.Label.Color}` }}
                  >
                    {item.Label.Name}
                  </Badge>
                </TableCell>
              </TableRow>
              {item.Links === "" && <TableRow className="border-0">
                <TableCell colSpan={2}>
                  No values enter below to add
                </TableCell>
              </TableRow>}
              {item.Links !== "" && Object.keys(JSON.parse(item.Links)).map((val, index) => (
                    <TableRow className="border-0" key={index}>
                      <TableCell className="p-2 font-bold ">{val}</TableCell>
                      <TableCell className="p-2 w-8/12">{JSON.parse(item.Links)[val]}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>

          <Button variant="ghost" size="sm" className="pl-2 flex w-full justify-start items-center">
            <BadgePlus className="mr-2 h-4 w-4"/>
            Add New link
          </Button>
          <Button
            variant="ghost"
            className="pl-2 flex w-full justify-start items-center"
          >
            <Copy className="text-xs mr-2 h-[15px] w-[15px]" />
            Copy link
          </Button>
          <Button
            variant="ghost"
            className="pl-2 text-red-600 w-full flex justify-start items-center hover:bg-red-500 hover:bg-opacity-40"
          >
            <Trash2Icon className="text-xs mr-2 h-[15px] w-[15px]" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
