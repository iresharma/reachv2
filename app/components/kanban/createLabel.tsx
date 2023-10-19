import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {Button} from "~/components/ui/button";
import {BadgePlus} from "lucide-react";
import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";
import * as React from "react";
import {useRef, useState} from "react";
import {Badge} from "~/components/ui/badge";
import {useRevalidator} from "@remix-run/react";
import createLabel from "~/services/api/kanban/createLabel";
import {secureLocalStorage} from "~/services/utils/secureLocalstorage";

export const CreateLabel = () => {
    const [color, setColor] = useState("#808080");
    const [name, setName] = useState("");
    const colorInputRef = useRef(null);
    const revalidator = useRevalidator();
    const createLabelWrapper = async () => {
        await createLabel({
            session: {
                UserAccount: secureLocalStorage.getItem("X-UserAccount")!,
                Session: secureLocalStorage.getItem("X-Session")!,
                Auth: secureLocalStorage.getItem("X-Auth")!,
                Board: secureLocalStorage.getItem("X-Board")!,
            },
            labelData: {
                color: color.substring(1), label: name
            }
        });
        revalidator.revalidate();
    }
    const openColorPallet = () => {
        if(colorInputRef.current !== null) {
            colorInputRef.current.click()
        }
    }
    return <Popover>
        <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="ml-auto hidden h-8 lg:flex mr-2">
                <BadgePlus className="mr-2 h-4 w-4"/>
                Add New Label
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Label</h4>
                    <p className="text-sm text-muted-foreground">
                        Create a new label
                    </p>
                </div>
                <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Label Name"
                            className="col-span-2 h-8"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="color">Color</Label>
                        <div className="relative col-span-2 ">
                            <Input
                                id="color"
                                type="text"
                                value={color}
                                placeholder="#080808"
                                className="h-8"
                                onChange={e => setColor(e.target.value)}
                            />
                            <div className="h-6 absolute top-1 right-2 w-6 rounded" style={{backgroundColor: color}} onClick={openColorPallet} />
                            <input ref={colorInputRef} type="color" className="hidden" onChange={(val) => {
                                setColor(val.target.value);
                                // @ts-ignore
                                colorInputRef.current.blur();
                            }} />
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <Label>Preview</Label>
                        <Badge style={{backgroundColor: color}} className="text-center">
                            {name}
                        </Badge>
                    </div>
                    <Button className="mt-2" onClick={createLabelWrapper}>
                        <BadgePlus className="mr-2 h-4 w-4"/>
                        Create
                    </Button>
                </div>
            </div>
        </PopoverContent>
    </Popover>
}
