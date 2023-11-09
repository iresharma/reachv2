import React, {useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";
import {Textarea} from "~/components/ui/textarea";
import {Button} from "~/components/ui/button";
import {Avatar, AvatarFallback} from "~/components/ui/avatar";
import {ImagePlusIcon} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "../ui/hover-card";

function HeaderEdit() {
    return <>
        <Card>
            <CardHeader>
                <CardTitle>Header Section</CardTitle>
                <CardDescription>
                    What area are you having problems with?
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6" style={{gridTemplateColumns: "1fr 2fr"}}>
                <div className="flex flex-col justify-center items-center space-y-4">
                    <Avatar className="w-24 h-24">
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Button variant="secondary">
                        <ImagePlusIcon className="h-4 w-4 mr-2"/>
                        Upload
                    </Button>
                </div>
                <div className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="subject">Profile Title</Label>
                        <Input id="subject" placeholder="Profile title"/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Bio</Label>
                        <Textarea
                            id="description"
                            placeholder="A small description for this page."
                        />
                    </div>
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
        <Card className="my-6">
            <CardHeader>
                <CardTitle>Button Styles</CardTitle>
                <CardDescription>
                    Decide the look of your webpage
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 h-64 overflow-y-scroll" style={{gridTemplateColumns: "1fr 1fr 1fr"}}>
                {[...Array(92)].map((val, index) => <div key={index}
                                                         className="bg-secondary p-4 rounded-2xl flex justify-center items-center h-20">
                    <button className={`button-${index}`}>Button type {index}</button>
                </div>)}
            </CardContent>
        </Card>
    </>
}

function Font() {
    const fonts = ["Pixelify Sans", "Abril Fatface", "Agbalumo", "Caveat", "Dancing Script", "Edu TAS Beginner", "Josefin Sans", "Oswald",
        "Playfair Display", "Roboto Condensed", "Roboto Slab", "Shadows Into Lightdisplayswap"];
    const [font, setFont] = useState("Pixelify Sans");
    return <>
        <Card className="my-6">
            <CardHeader>
                <CardTitle>Font</CardTitle>
                <CardDescription>
                    Choose the fonts and color you need.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Select onValueChange={(e) => setFont(e)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={font} className="select-font-style"/>
                    </SelectTrigger>
                    <SelectContent>
                        {fonts.map((val, index) => <SelectItem key={val} value={val}
                                                               style={{fontFamily: val}}>{val}</SelectItem>)}
                    </SelectContent>
                </Select>
                <div className="text-muted-foreground my-2 px-2" style={{fontFamily: font}}>
                    This what the text on buttons and everything on you page will look like.
                </div>
            </CardContent>
        </Card>
    </>
}

function Meta() {
    const tags = {
        "description": "A brief description of the content. ",
        "robots": "",
        "og:title": "The title of your page.",
        "og:url": "The URL of the content.",
        "og:image": "The URL of an image for the social snippet.",
        "og:type": "The type of object you’re sharing. (e.g., article, website, etc.)",
        "og:description": "A brief description of the content.",
        "og:locale": "Defines the content language."
    }
    return <>
        <Card className="my-6">
            <CardHeader>
                <CardTitle>SEO</CardTitle>
                <CardDescription>
                    Try to fill all the fields below for better SEO. <br/>
                    <small className="text-green-500 text-xs">Hover on the label to know more</small>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-x-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
                    {Object.keys(tags).map(val => <div key={val} className="grid gap-4 my-2" style={{gridTemplateColumns: "1fr 2fr"}}>
                        <HoverCard>
                            <HoverCardTrigger className="hover:underline cursor-help">{val}</HoverCardTrigger>
                            <HoverCardContent>
                                {tags[val]}
                                <br />
                                {val.startsWith("og") && <a target="_blank" className="underline cursor-pointer" href="https://ahrefs.com/blog/open-graph-meta-tags/">Read more here.</a>}
                                {val === "robots" && <a target="_blank" className="underline cursor-pointer" href="https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag">Read here.</a>}
                            </HoverCardContent>
                        </HoverCard>
                        <Input type="text" placeholder="Value" />
                    </div>)}
                </div>
            </CardContent>
        </Card>
    </>
}

export default function Style() {
    return <>
        <HeaderEdit/>
        <ButtonStyle/>
        <Font/>
        <Meta />
    </>
}
