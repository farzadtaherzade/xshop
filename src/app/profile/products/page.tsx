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
import Image from "next/image"
import ProductActions from "./product-actions"
import NotFoundProduct from "./not-found-product"


export default async function page() {
    const session = await getSession()
    if (!session) return null

    const products = await prisma.product.findMany({
        where: {
            authorId: session.userId
        },
    })

    return (
        <div>
            <h1>Products</h1>
            {products.length == 0 ? <NotFoundProduct />
                : (
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Id</TableHead>
                                <TableHead className="text-center">Title</TableHead>
                                <TableHead className="w-[70px] text-center">Price</TableHead>
                                <TableHead className="w-[70px] text-center">Image</TableHead>
                                <TableHead className="w-[40px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((p, id) => (
                                <TableRow key={p.id}>
                                    <TableCell className="font-medium">{id}</TableCell>
                                    <TableCell className="text-center">{p.title}</TableCell>
                                    <TableCell className="w-[70px] text-center">${p.price}</TableCell>
                                    <TableCell className="w-[70px] text-center">
                                        <Image src={p.images[0]?.url as unknown as string} width={70} height={70} className="ext-center" alt={p.images[0]?.name} />
                                    </TableCell>
                                    <TableCell className="w-[40px] text-center">
                                        <ProductActions id={p.id} />
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
