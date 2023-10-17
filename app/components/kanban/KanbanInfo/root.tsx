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
  const status_mapping = ["Todo", "Progress", "Done", "Canceled", "backlog"];
  const textAreaHeight = (e: any) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };
  const getStatus = (status: number): string => {
    let colorClass = "";

    switch (status) {
      case 0:
        colorClass = "text-blue-400";
        break;
      case 1:
        colorClass = "text-yellow-400";
        break;
      case 2:
        colorClass = "text-green-400";
        break;
      case 3:
        colorClass = "text-muted-foreground line-through";
        break;
      case 4:
        colorClass = "text-red-400";
        break;
    }
    return colorClass;
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
          <span className={"capitalize " + getStatus(item.Status)}>
            {status_mapping[item.Status]}
          </span>
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
