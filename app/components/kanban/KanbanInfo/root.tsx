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
import { Copy, Trash2Icon } from "lucide-react";

export type Item = {
  Title: string,
  Status: number,
  Id: string,
  Desc: string,
  Label: {
    Color: string,
    Name: string
  },
  Links: string
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
    <div>
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
        <div>
          <Tiptap content={item.Desc} />
          <h3>Comments</h3>
        </div>
        <div>
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
              {Object.keys(JSON.parse(item.Links)).map((val, index) => (
                <TableRow className="border-0" key={index}>
                  <TableCell className="p-2 font-bold ">{val}</TableCell>
                  <TableCell className="p-2 w-8/12">{JSON.parse(item.Links)[val]}</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-0">
                <TableCell className="p-2 font-bold ">dummy</TableCell>
                <TableCell className="p-2 w-8/12">dummy</TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
