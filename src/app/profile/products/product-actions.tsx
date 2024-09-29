'use client'

import { deleteProduct } from "@/actions/product"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"



export default function ProductActions({ id }: { id: string }) {
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size='icon'>
                    <DotsHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => deleteProduct(id)}>
                    Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/profile/create?id=${id}`)}>
                    Edit
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
