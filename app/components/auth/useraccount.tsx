import { Button } from "~/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"
import { Label } from "~/components/ui/label";
import {Form} from "@remix-run/react";

export default function UserAccountInput() {
    return (
        <div className="w-[500px]">
            <Card>
                <CardHeader>
                    <CardTitle>User Account Information</CardTitle>
                    <CardDescription>
                        Paste the joining token below to join an existing Team\User Account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-2">
                        <Input placeholder="930053d3-7521-41c8-906e-1af1eac136eb" />
                        <Button variant="secondary" className="shrink-0">
                            Join
                        </Button>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">Create a User Account</h4>
                        <Form method="post">
                            <div className="space-y-1">
                                <Label htmlFor="name">Account Name</Label>
                                <div className="flex space-x-2">
                                    <Input
                                        id="email"
                                        name="name"
                                        placeholder="@reach"
                                    />
                                    <Button type="submit" variant="secondary" className="shrink-0">
                                        Create
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
