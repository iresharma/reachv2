import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {EyeIcon, MousePointer, MousePointerClickIcon, Twitch, ViewIcon} from "lucide-react";
import {TopLinks} from "~/components/page/components/topLinks";
import UserCategory from "~/components/page/components/userCategory";

export default function Analytics() {
    return <>
        <Card className="border-0">
            <CardHeader>
                <CardTitle>Lifetime analytics</CardTitle>
                <CardDescription>Here are the lifetime analytics of your page.</CardDescription>
            </CardHeader>
            <br/>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer">
                        <CardTitle className="text-sm font-medium">
                            Total Views
                        </CardTitle>
                        <EyeIcon className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">34,567</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-400">+20.1%</span>&nbsp; from last
                            month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer">
                        <CardTitle className="text-sm font-medium">Unique Views</CardTitle>
                        <ViewIcon className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3,430</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-400">+20.1%</span>&nbsp; from last
                            month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <MousePointer className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,234</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-red-400">-20.1%</span>&nbsp; from last
                            month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Unique Views</CardTitle>
                        <MousePointerClickIcon className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">573</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-400">+20.1%</span>&nbsp; from last
                            month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">CTR</CardTitle>
                        <Twitch className="text-muted-foreground h-4 w-4"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">573</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-400">+20.1%</span>&nbsp; from last
                            month
                        </p>
                    </CardContent>
                </Card>
            </div>
        </Card>
        <TopLinks/>
        <UserCategory/>
    </>
}
