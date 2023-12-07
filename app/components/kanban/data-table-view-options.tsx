import {PlusCircledIcon} from "@radix-ui/react-icons";

import {Button} from "~/components/ui/button";
import {Sheet, SheetContent} from "~/components/ui/sheet";
import KanbanSheet from "~/components/kanban/KanbanInfo/root";
import * as React from "react";
import {CreateLabel} from "~/components/kanban/createLabel";
import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "~/components/ui/alert-dialog";

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

export function DataTableViewOptions({ labels }: { labels: any; }) {
    const [sheet, setSheet] = React.useState(false);
    const [alert, setAlert] = React.useState(false);
    const addNew = () => {
        if(labels.length === 0) {
            setAlert(true);
        }
        else {
            setSheet(true);
        }
    }
    return (
        <>
            <CreateLabel />
            <Button size="sm" className="ml-auto hidden h-8 lg:flex hover:bg-white bg-gray-400 text-black" onClick={addNew}>
                <PlusCircledIcon className="mr-2 h-4 w-4 text-black"/>
                Add New
            </Button>
            <Sheet open={sheet}>
                <SheetContent
                    className="p-0"
                    style={{width: "65vw"}}
                    onPointerDownOutside={() => setSheet(false)}
                >
                    <KanbanSheet item={emptyData} createItemProp={true} labels={labels} />
                </SheetContent>
            </Sheet>
            <AlertDialog open={alert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Can not proceed!</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please create a label before you can proceed to add an item. Every item should be connected to a label.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setAlert(false)}>OK</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
