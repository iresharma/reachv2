import Background from "~/assets/auth-page.svg";
import {redirect} from "react-router";
import { getSession} from "~/session";
import type {ActionArgs} from "@remix-run/node";
import {createMetaData} from "~/services/api/auth/createMetaData";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {Input} from "~/components/ui/input";
import {Label} from "@radix-ui/react-menu";
import {Button} from "~/components/ui/button";
import {Avatar, AvatarImage} from "~/components/ui/avatar";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "~/components/ui/tooltip";

export const action = async ({ request }: ActionArgs) => {
    const session = await getSession(request.headers.get("Cookie"))
    const formData = Object.fromEntries(await request.formData());
    const resp = await createMetaData({...formData, session: session.get("X-Session"), auth: session.get("X-Auth") });
    if(resp.status !== 200) {
    //     error
    }
    return redirect("/auth/useraccount")
}

export default function UserInfo() {
    const handleUpload = () => {
        const link = document.createElement('input')
        link.style.display = 'none'
        link.setAttribute("type", "file")
        const upload = () => {}
        link.addEventListener("change", upload);

        document.body.appendChild(link)

        link.click()
    }

    return <>
        <div
            className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="lg:p-8 m-auto">
                <Card className="w-[350px]">
                    <form method="POST" action="/auth/userInfo">
                        <CardHeader>
                            <CardTitle>Create User</CardTitle>
                            <CardDescription>Add user information.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Avatar onClick={handleUpload}
                                                className="w-32 h-32 p-8 m-auto border cursor-pointer">
                                            <AvatarImage src="https://cdn-icons-png.flaticon.com/512/8191/8191581.png"
                                                         alt="@shadcn"/>
                                        </Avatar>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Upload Image</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label>Name</Label>
                                    <Input id="name" name="name" placeholder="Your name"/>
                                </div>
                            </div>
                            <input type="text" className="hidden" name="photourl"/>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="submit">Next</Button>
                        </CardFooter>

                    </form>
                </Card>
            </div>
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div
                    className="absolute inset-0  bg-no-repeat"
                    style={{
                        backgroundImage: `url(${Background})`,
                        backgroundSize: "60%",
                        backgroundPosition: "center 30%",
                    }}
                />
                <div className="relative z-20 flex items-center text-lg font-medium dark:text-white text-black">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>
                    </svg>
                    Reach
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2 dark:text-white text-black">
                        <p className="text-4xl">
                            Store. Manage. <br/>
                            Collaborate. Create.
                        </p>
                        <p className="text-lg">
                            Reach provides you with a complete workspace to manage your
                            content and collaboration needs.
                        </p>
                        <a
                            href="https://iresharma.com"
                            target="_blank"
                            className="text-sm"
                        >
                            ~ Iresharma
                        </a>
                    </blockquote>
                </div>
            </div>
        </div>
    </>
}
