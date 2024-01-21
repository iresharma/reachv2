import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/ui/tabs";
import {DesktopIcon, MobileIcon} from "@radix-ui/react-icons";
import {PresentationIcon, TabletIcon} from "lucide-react";

export default function UserCategory() {
    const data = [
        {
            title: "Mobile",
            icon: <MobileIcon className="h-6 mt-2 w-6" />
        },
        {
            title: "Desktop",
            icon: <DesktopIcon className="h-6 mt-2 w-6" />
        },
        {
            title: "Tabs",
            icon: <TabletIcon className="h-6 mt-2 w-6" />
        },
        {
            title: "Others",
            icon: <PresentationIcon className="h-6 mt-2 w-6" />
        }
    ]
    return <Card className="mt-6">
        <CardHeader>
            <CardTitle>User Categories</CardTitle>
            <CardDescription>Here are most insights about your users.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="links">
                <TabsList>
                    <TabsTrigger value="links">Location</TabsTrigger>
                    <TabsTrigger value="styles">Devices</TabsTrigger>
                </TabsList>
                <TabsContent value="links">
                    <div className="py-4">
                        {data.map((_, index) => <div key={index}
                            className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                            <img src="https://flagsapi.com/BE/flat/64.png" className="mt-px h-5 w-5" alt="flag"/>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Germany</p>
                                <p className="text-sm text-muted-foreground">
                                    1.7k Views &emsp; 556 Clicks &emsp; 21.7% CTR
                                </p>
                            </div>
                        </div>)}
                    </div>
                </TabsContent>
                <TabsContent value="styles">
                    <div className="py-4">
                        {data.map(val => <div key={val.title}
                                              className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                            {val.icon}
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none capitalize">{val.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    1.7k Views &emsp; 556 Clicks &emsp; 21.7% CTR
                                </p>
                            </div>
                        </div>)}
                    </div>
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
}
