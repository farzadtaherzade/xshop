'use client'

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useCartStore } from "@/hooks/use-cart"
import { ShoppingCart } from "lucide-react"
import CartItem from "./cart-item"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function CartSidebar() {
    const { items } = useCartStore()
    const itemCount = items.length

    return (
        <Sheet>
            <SheetTrigger asChild className="group -m-2 flex items-center p-2">
                <Button variant="outline" className="group -m-2 flex items-center p-2">
                    <ShoppingCart
                        aria-hidden='true'
                        className="h-[1.2rem] w-[1.2rem] flex-shrink-0 text-gray-400 group-hover:text-gray-200 duration-150"
                    />
                    <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                        {itemCount}
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent className='flex w-full flex-col pr-0 sm:max-w-md'>
                <SheetHeader className='space-y-2.5 pr-6'>
                    <SheetTitle>Cart ({itemCount})</SheetTitle>
                </SheetHeader>
                <ScrollArea>
                    <div className='flex w-full flex-col pr-6'>
                        {items.map((item) => (
                            <CartItem
                                item={item}
                                key={item.id}
                            />
                        ))}
                    </div>
                </ScrollArea>
                <div className='space-y-4 pr-6 mt-auto'>
                    <Separator />
                    <div className='space-y-1.5 text-sm'>
                        <div className='flex'>
                            <span className='flex-1'>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className='flex'>
                            <span className='flex-1'>Total</span>
                            <span>
                                2
                            </span>
                        </div>
                    </div>
                    <SheetFooter>
                        <Button type="submit" className="w-full">Save changes</Button>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    )
}