import {Button} from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {Input} from "../ui/input";
import {Label} from "../ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs";
import {CheckCheck, Link, Mail, X} from "lucide-react";
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "../ui/tooltip";
import {useState} from "react";
import {Form, useSubmit} from "@remix-run/react";
import {emailExists} from "~/services/api/auth/emailexists";
import Loader from "~/components/misc/loader";

export function AuthTabs() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailVerify, setVerifyState] = useState<"LOADING" | "EXISTS" | "OK" | null>(null);
    const emailExistsCallback = async () => {
        setVerifyState("LOADING")
        const emailExistsResp = await emailExists({email});
        console.log(emailExistsResp)
        setVerifyState(emailExistsResp ? "EXISTS" : "OK")
    }
    return (
        <Tabs defaultValue="signin" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
                <Card>
                    <Form method="post" action="/auth/signin">
                        <CardHeader>
                            <CardTitle>Sign In</CardTitle>
                            <CardDescription>
                                Sign In and enter to see your team&apos;s achievements
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Email</Label>
                                <Input
                                    onChange={({target}) => setEmail(target.value)}
                                    id="email"
                                    name="email"
                                    placeholder="example@reach.io"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Password</Label>
                                <Input
                                    onChange={({target}) => setPassword(target.value)}
                                    id="password"
                                    type="password"
                                    name="password"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="submit">
                                <Mail className="mr-2 h-4 w-4"/> Login with Email
                            </Button>
                            <SsoButton/>
                        </CardFooter>
                    </Form>
                </Card>
            </TabsContent>
            <TabsContent value="signup">
                <Card>
                    <Form method="post" action="/auth/signup">
                        <CardHeader>
                            <CardTitle>Create Account</CardTitle>
                            <CardDescription>
                                Create an account and lead your team to the moon.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1 relative">
                                <Label htmlFor="name">Email</Label>
                                <Input name="email" onChange={({target}) => setEmail(target.value)} onBlur={emailExistsCallback}
                                       placeholder="example@reach.io" id="input-with-load"/>
                                <span id="verify-status">
                                    {
                                        emailVerify === "LOADING" && <Loader/>
                                    }
                                    {
                                        emailVerify === "EXISTS" && <X style={{color: "red"}}/>
                                    }
                                    {
                                        emailVerify === "OK" && <CheckCheck style={{color: "green"}}/>
                                    }
                                </span>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">Password</Label>
                                <Input name="password" onChange={({target}) => setPassword(target.value)} id="new" type="password"/>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="submit">
                                <Mail className="mr-2 h-4 w-4"/> SignUp with Email
                            </Button>
                            <SsoButton/>
                        </CardFooter>
                    </Form>
                </Card>
            </TabsContent>
        </Tabs>
    );
}

const SsoButton = () => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button type="reset" variant="ghost" className="bg-purple-950 bg-opacity-50">
                        <Link className="mr-2 h-4 w-4"/>
                        SignUp with SSO
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Coming Soon 🎉!!</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
