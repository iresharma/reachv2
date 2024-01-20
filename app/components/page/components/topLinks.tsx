import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import {MousePointerClickIcon} from "lucide-react";
import {Card, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";

const invoices = [
    {
        link: "INV001",
        clicks: "250.00"
    },
    {
        link: "INV002",
        clicks: "150.00",
    },
    {
        link: "INV003",
        clicks: "350.00",
    },
    {
        link: "INV004",
        clicks: "450.00",
    }
]

export function TopLinks() {
    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Top performing links</CardTitle>
                <CardDescription>These are your most clicked links.</CardDescription>
            </CardHeader>
            <Table className="p-4">
                <TableCaption className="mb-2">A list of your most clicked links.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead colSpan={3}>Link</TableHead>
                        <TableHead className="text-right">
                            <MousePointerClickIcon className="h-4 w-4 text-muted-foreground inline-block mr-2"/>Clicks
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.link}>
                            <TableCell colSpan={3} className="font-medium">{invoice.link}</TableCell>
                            <TableCell className="text-right">{invoice.clicks}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}
