'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Product } from "@prisma/client"
import Image from "next/image"

export default function OrderDetails({ products, orderNumber }: { products: Product[], orderNumber: number }) {
    return (
        <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent className="w-">
                <DialogHeader className="space-y-8">
                    <DialogTitle>Order Detail #{orderNumber}</DialogTitle>

                    {products.map((p) => (
                        <div className="grid grid-cols-[60px_1fr_70px_50px] gap-x-6" key={p.id}>
                            <Image src={p.images[0].url} width={60} height={50} className="text-center w-[60px] h-[50px] rounded-lg" alt={p.images[0]?.name} />
                            <div className="flex-col">
                                <span className="font-semibold text-[15px]">Title:</span>
                                <p className="text-sm font-normal">{p.title}</p>
                            </div>
                            <div className="flex-col">
                                <span className="font-semibold text-[15px]">Quantity:</span>
                                <p className="text-sm font-normal">2</p>
                            </div>
                            <div className="flex-col">
                                <span className="font-semibold text-[15px]">Price:</span>
                                <p className="text-sm font-normal">${p.price}</p>
                            </div>
                        </div>
                    ))}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
