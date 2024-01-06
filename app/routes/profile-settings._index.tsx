import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {LoaderArgs} from "@remix-run/node";
import {getSession} from "~/session";
import {useLoaderData} from "react-router";
import {getUser} from "~/services/api/auth/getUser";
import {toast} from "sonner";
import {updateMetadata} from "~/services/api/auth/updateMetadata";
import {secureLocalStorage} from "~/services/utils/secureLocalstorage";

const profileFormSchema = z.object({
    username: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

type RouteData = {
    user: {
        "Email": string;
        "Id": string;
        "IsVerified": boolean;
        "Metadata": {
            "Id": string;
            "Name": string;
            "PhotoUrl": string;
        },
        "MetadataId": string;
        "Perm": string;
        "SettingsId": string;
        "UserAccountId": string;
    }
}

export async function loader({ request }: LoaderArgs): Promise<RouteData> {
    const session = await getSession(request.headers.get("Cookie"))
    const user = await getUser({ session: session.get("X-Session"), auth: session.get("X-Auth") })
    return {user}
}

export default function ProfileForm() {
    const user = (useLoaderData() as RouteData).user

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            username: user.Metadata.Name,
            email: user.Email,
        },
        mode: "onChange",
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await updateMetadata({
            session: secureLocalStorage.getItem("X-Session"),
            auth: secureLocalStorage.getItem("X-Auth"),
            name: form.getValues().username
        })
        toast("Data updated!!")
    }

    return (
        <Form {...form}>
            <form onSubmit={(e) => onSubmit(e)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="example@reach.io" disabled={true} {...field} />
                            </FormControl>
                            <FormDescription>
                                Email address cannot be changed abruptly, for special case{" "}
                                <a className="text-blue-500 underline underline-offset-4">contact support</a>.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    );
}
