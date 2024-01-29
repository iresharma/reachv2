import React, {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";
import {Textarea} from "~/components/ui/textarea";
import {Button} from "~/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "~/components/ui/avatar";
import {ImagePlusIcon, SaveIcon} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "../ui/hover-card";
import {useLoaderData} from "react-router";
import type {Page, Meta} from "~/services/api/page/getPage";
import bg1 from "~/assets/pageBackground/bg1.png";
import bg2 from "~/assets/pageBackground/bg2.png";
import bg3 from "~/assets/pageBackground/bg3.png";
import bg4 from "~/assets/pageBackground/bg4.png";
import bg5 from "~/assets/pageBackground/bg5.png";
import bg6 from "~/assets/pageBackground/bg6.png";

function HeaderEdit({ headerData }: { headerData: { Name: string; Desc: string, PhotoUrl: string } }) {
    const [imgUrl, setImgUrl] = useState(headerData.PhotoUrl)
    const uploadFile = () => {
        const link = document.createElement('input')
        link.setAttribute("type", "file")
        link.click()
        // @ts-ignore
        link.onchange = (e) => {
            // @ts-ignore
            const file = e.target.files[0]
            let reader = new FileReader()
            reader.onload = () => {
                // @ts-ignore
                setImgUrl(reader.result)
            }
            reader.readAsDataURL(file);
        }
    }
    return <>
        <Card>
            <CardHeader>
                <CardTitle>Header Section</CardTitle>
                <CardDescription>
                    Info for the header section of the page
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6" style={{gridTemplateColumns: "1fr 2fr"}}>
                <div className="flex flex-col justify-center items-center space-y-4">
                    <Avatar className="w-24 h-24">
                        <AvatarFallback>CN</AvatarFallback>
                        <AvatarImage src={imgUrl} />
                    </Avatar>
                    <Button onClick={uploadFile} variant="secondary">
                        <ImagePlusIcon className="h-4 w-4 mr-2"/>
                        Upload
                    </Button>
                </div>
                <div className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="subject">Profile Title</Label>
                        <Input id="subject" placeholder="Profile title" value={headerData.Name}/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Bio</Label>
                        <Textarea
                            id="description"
                            placeholder="A small description for this page."
                            value={headerData.Desc}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    </>
}

function ButtonStyle({ button }: { button: string; }) {
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
                                                         className={"bg-secondary p-4 rounded-2xl flex justify-center items-center h-20" + (`button-${index}` === button && "ring ring-2 ring-primary" )}>
                    <button className={`button-${index}`}>Button type {index}</button>
                </div>)}
            </CardContent>
        </Card>
    </>
}

function BackgroundStyle() {
    const back = (index: number) => {
        switch (index) {
            case 0: return bg1;
            case 1: return bg2;
            case 2: return bg3;
            case 3: return bg4;
            case 4: return bg5;
            case 5: return bg6;
        }
    }
    return <>
        <Card className="my-6">
            <CardHeader>
                <CardTitle>Background Styles</CardTitle>
                <CardDescription>
                    Decide the look of your webpage
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 h-64 overflow-y-scroll" style={{gridTemplateColumns: "1fr 1fr 1fr"}}>
                {[...Array(6)].map((val, index) => <div style={{ background: `url(${back(index)})`, backgroundSize: "contain" }} className={"bg-secondary p-4 rounded-2xl flex justify-center items-center h-20"}></div>)}
            </CardContent>
        </Card>
    </>
}

function Font({ initialFont }: { initialFont: string; }) {
    const fonts = ["Pixelify Sans", "Abril Fatface", "Agbalumo", "Caveat", "Dancing Script", "Edu TAS Beginner", "Josefin Sans", "Oswald",
        "Playfair Display", "Roboto Condensed", "Roboto Slab", "Shadows Into Lightdisplayswap"];
    const [font, setFont] = useState(initialFont === "" ? "Pixelify Sans" : initialFont);
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

function Meta({ metaTags }: { metaTags: Meta[] }) {
    const [tags, setTags] = useState({});
    useEffect(() => {
        let tempTags = {
            "description": ["A brief description of the content. ", ""],
            "robots": ["", ""],
            "og:title": ["The title of your page.", ""],
            "og:url": ["The URL of the content.", ""],
            "og:image": ["The URL of an image for the social snippet.", ""],
            "og:type": ["The type of object you’re sharing. (e.g., article, website, etc.)", ""],
            "og:description": ["A brief description of the content.", ""],
            "og:locale": ["Defines the content language.", ""],
        }
        metaTags.forEach(meta => {
            // @ts-ignore
            tempTags[meta.Type][1] = meta.Value
        });
        setTags(tempTags)
    }, [])
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
                    {Object.keys(tags).map(val => <div key={val} className="grid gap-4 my-2 items-center" style={{gridTemplateColumns: "1fr 2fr"}}>
                        <HoverCard>
                            <HoverCardTrigger className="hover:underline cursor-help capitalize">{val}</HoverCardTrigger>
                            <HoverCardContent>
                                {tags[val][0]}
                                <br />
                                {val.startsWith("og") && <a target="_blank" className="underline cursor-pointer" href="https://ahrefs.com/blog/open-graph-meta-tags/">Read more here.</a>}
                                {val === "robots" && <a target="_blank" className="underline cursor-pointer" href="https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag">Read here.</a>}
                            </HoverCardContent>
                        </HoverCard>
                        <Input type="text" placeholder="Value" value={tags[val][1]} />
                    </div>)}
                </div>
            </CardContent>
        </Card>
    </>
}

export default function Style() {
    const { page } = useLoaderData() as { page: Page };
    return <>
        <HeaderEdit headerData={{
            Name: page.Template.Name,
            Desc: page.Template.Desc,
            PhotoUrl: page.Template.Image
        }}/>
        <ButtonStyle button={page.Template.Button}/>
        <BackgroundStyle />
        <Font initialFont={page.Template.Font} />
        <Meta metaTags={page.Template.MetaTags} />
        <Button>
            <SaveIcon className="h-4 w-4 mr-2" />
            Save changes
        </Button>
    </>
}
