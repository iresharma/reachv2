import {PlusCircledIcon} from "@radix-ui/react-icons";

import {Button} from "~/components/ui/button";
import * as React from "react";
import {CreateLabel} from "~/components/kanban/createLabel";
import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "~/components/ui/alert-dialog";
import CreateItem from "~/components/kanban/KanbanInfo/createItem";

export function DataTableViewOptions({ labels }: { labels: any; }) {
    const [createItemDialog, setCreateItemDialog] = React.useState(false);
    const [infoDialog, setInfoDialog] = React.useState(false);
    const addNew = () => {
        if(labels.length === 0) {
            setInfoDialog(true);
        }
        else {
            setCreateItemDialog(true);
        }
    }
    return (
        <>
            <CreateLabel />
            <Button size="sm" className="ml-auto hidden h-8 lg:flex hover:bg-white bg-gray-400 text-black" onClick={addNew}>
                <PlusCircledIcon className="mr-2 h-4 w-4 text-black"/>
                Add New
            </Button>
            { labels.length > 0 && <CreateItem open={createItemDialog} close={() => setCreateItemDialog(false)} labels={labels}/>}
            <AlertDialog open={infoDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Can not proceed!</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please create a label before you can proceed to add an item. Every item should be connected to a label.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setInfoDialog(false)}>OK</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
