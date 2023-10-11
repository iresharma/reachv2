import {PlusCircledIcon} from "@radix-ui/react-icons";

import {Button} from "~/components/ui/button";
import {Sheet, SheetContent} from "~/components/ui/sheet";
import KanbanSheet from "~/components/kanban/KanbanInfo/root";
import * as React from "react";

const emptyData = {
    Title: "",
    Status: 0,
    Id: "",
    Desc: "",
    Label: {
        Color: "",
        Name: ""
    },
    Links: "{}"
}

export function DataTableViewOptions() {
    const [sheet, setSheet] = React.useState(false);
    const openSheet = (state: boolean) => {
        setSheet(state);
    }
    return (
        <>
            <Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex" onClick={() => openSheet(true)}>
                <PlusCircledIcon className="mr-2 h-4 w-4"/>
                Add New
            </Button>
            <Sheet open={sheet}>
                <SheetContent
                    className="p-0"
                    style={{width: "65vw"}}
                    onPointerDownOutside={() => openSheet(false)}
                >
                    <KanbanSheet item={emptyData}/>
                </SheetContent>
            </Sheet>
        </>
    );
}
