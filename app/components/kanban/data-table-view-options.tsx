import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "~/components/ui/button";

export function DataTableViewOptions() {
  return (
    <Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
      <PlusCircledIcon className="mr-2 h-4 w-4" />
      Add New
    </Button>
  );
}
