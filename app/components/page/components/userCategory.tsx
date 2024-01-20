import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/ui/tabs";

export default function UserCategory() {
    return <Card className="mt-6">
        <CardHeader>
            <CardTitle>User Categories</CardTitle>
            <CardDescription>Here are most insights about your users.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="links" className="w-[60vw]">
                <TabsList>
                    <TabsTrigger value="links">Location</TabsTrigger>
                    <TabsTrigger value="styles">Devices</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="links">
                    hi 1
                </TabsContent>
                <TabsContent value="styles">
                    Hi 2
                </TabsContent>
                <TabsContent value="analytics">
                    Hi 3
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
}
