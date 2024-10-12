import { getSession } from "@/lib/dal"
import prisma from "@/lib/db"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import NotFoundProduct from "../products/not-found-product"
import { Badge } from "@/components/ui/badge"
import OrderDetails from "./order-detail"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Orders',
    description: 'Latest Orders',
}

export default async function page() {
    const session = await getSession()
    if (!session) return null

    const orders = await prisma.order.findMany({
        where: {
            userId: session.userId
        },
        include: {
            products: true
        }
    })

    return (
        <div className="space-y-9">
            <h1>Products</h1>
            {orders.length == 0 ? <NotFoundProduct />
                : (
                    <Table className="border border-opacity-5 rounded-lg">
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader className="border rounded-lg">
                            <TableRow>
                                <TableHead className="text-center">Order Number</TableHead>
                                <TableHead className="text-center">Total</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-center">created</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell className="text-center"> {p.id} </TableCell>
                                    <TableCell className="text-center"> ${p.total} </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={
                                            p.status == "in progress" ? "secondary" :
                                                p.status == "success" ? "destructive" : "default"
                                        } >
                                            {p.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">{p.createdAt.toUTCString()}</TableCell>
                                    <TableCell className="text-center">
                                        <OrderDetails products={p.products} orderNumber={p.id} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )
            }
        </div>
    )
}
