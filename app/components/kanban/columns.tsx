import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import { Task } from "./data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.original.Id}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Badge
            variant="outline"
            style={{ backgroundColor: `#${row.original.Label.Color}` }}
          >
            {row.original.Label.Name}
          </Badge>
          <span className="max-w-[500px] truncate font-medium">
            {row.original.Title}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      let colorClass = "";
      let status = {
        value: "todo",
        label: "Todo",
        icon: CircleIcon,
      };

      switch (row.original.Status) {
        case 0:
          status = {
            value: "todo",
            label: "Todo",
            icon: CircleIcon,
          };
          colorClass = "text-blue-400";
          break;
        case 1:
          status = {
            value: "in progress",
            label: "In Progress",
            icon: StopwatchIcon,
          };
          colorClass = "text-yellow-400";
          break;
        case 2:
          status = {
            value: "done",
            label: "Done",
            icon: CheckCircledIcon,
          };
          colorClass = "text-green-400";
          break;
        case 3:
          status = {
            value: "canceled",
            label: "Canceled",
            icon: CrossCircledIcon,
          };
          colorClass = "text-muted-foreground line-through";
          break;
        case 4:
          colorClass = "text-red-400";
          status = {
            value: "backlog",
            label: "Backlog",
            icon: QuestionMarkCircledIcon,
          };
          break;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className={`mr-2 h-4 w-4 ${colorClass}`} />
          )}
          <span className={colorClass}>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
