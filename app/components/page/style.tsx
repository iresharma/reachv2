import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";
import {Textarea} from "~/components/ui/textarea";
import {Button} from "~/components/ui/button";

function HeaderEdit() {
    return <>
        <Card>
            <CardHeader>
                <CardTitle>Header Section</CardTitle>
                <CardDescription>
                    What area are you having problems with?
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="subject">Profile Title</Label>
                    <Input id="subject" placeholder="Profile title" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="description">Bio</Label>
                    <Textarea
                        id="description"
                        placeholder="A small description for this page."
                    />
                </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
                <Button>Submit</Button>
            </CardFooter>
        </Card>
    </>
}

function ButtonStyle() {
    return <>
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Button Styles</CardTitle>
                <CardDescription>
                    Decide the look of your webpage
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 h-64 overflow-y-scroll" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                {[...Array(92)].map((val, index) => <div className="flex justify-center items-center h-20">
                    <button className={`button-${index}`}>Button type {index}</button>
                </div>)}
            </CardContent>
        </Card>
    </>
}

export default function Style() {
    return <>
        <HeaderEdit />
        <ButtonStyle />
    </>
}
