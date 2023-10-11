import { Button } from "~/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import background from "~/assets/404-back.png";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen bg-contain" style={{ backgroundImage: `url(${background})` }}>
            <Card className="w-[420px] bg-gray-800 border-0">
                <CardHeader className="text-center">
                    <CardTitle className="lg:text-7xl text-4xl font-special text-white">404</CardTitle>
                    <CardDescription>
                        The page you’re looking for doesn’t exist.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center">
                    <Button variant="ghost" className="text-white" asChild>
                        <a href="/">Go Back</a>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
