'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/hooks/use-cart'
import { MinusIcon, PlusIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import NoItems from './no-items'
import { useToast } from "@/hooks/use-toast";

export default function Page() {
    const { toast } = useToast()
    const router = useRouter()
    const { items, removeItem, increaseQuantity, decreaseQuantity, clearCart } = useCartStore()
    const total = items.reduce((p, c) => {
        return p + c.quantity
    }, 0)
    const price = items.reduce((p, c) => {
        return p + c.price * c.quantity
    }, 0)

    async function payHandler() {
        const response = await fetch('/api/payment', {
            method: "POST",
            body: JSON.stringify({
                items,
                amount: price
            })
        })
        const data = await response.json()
        router.push(data.url)
    }
    return (
        <main className='space-y-6'>
            <section className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold mb-3'>Shopping Cart</h1>
                <Button size="lg" variant="outline" onClick={() => clearCart()}>Clear cart items</Button>
            </section>
            <section className='grid grid-cols-1 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px] gap-x-12 gap-y-4'>
                <div className='w-full'>
                    {items.length > 0 ? <>
                        {
                            items.map(item => (
                                <div className='py-4' key={item.id}>
                                    <div className='grid grid-cols-[90px_1fr] gap-x-5 p-2 dark:shadow-lg'>
                                        <div className='w-full rounded-sm'>
                                            <Image src={item.image.url} alt={item.image.name} width="90" height="90" className='w-[90px] h-[90px] rounded-sm object-center' />
                                        </div>
                                        <div className='flex flex-col gap-y-1'>
                                            <div className='flex justify-between font-medium text-base -mb-2'>
                                                <Link href={`/p/${item.slug}`} className='text-lg font-semibold tracking-wider md:w-[250px]'>{item.title}</Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <XIcon className='w-4 h-4' />
                                                </Button>
                                            </div>
                                            <p className='text-sm'>${item.price}</p>
                                            <div className='flex items-center gap-x-4'>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => decreaseQuantity(item.id)}
                                                    className='w-7 h-7'
                                                >
                                                    <MinusIcon className='w-4 h-4' />
                                                </Button>
                                                <p className='text-sm font-medium text-neutral-500 dark:text-neutral-700'>Qty {item.quantity}</p>
                                                <Button
                                                    variant="default"
                                                    size="icon"
                                                    onClick={() => {
                                                        if (item.quantity >= 3) {
                                                            toast({
                                                                title: "Quantity cant be more than 3",
                                                                variant: "destructive"
                                                            })

                                                        } else increaseQuantity(item.id)
                                                    }}
                                                    className='w-7 h-7'
                                                >
                                                    <PlusIcon className='w-4 h-4' />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </> : <NoItems />}
                </div>
                <div className='w-full h-fit bg-neutral-50 dark:bg-neutral-950 space-y-5 p-4 rounded-lg border dark:border-opacity-5 dark:border-neutral-100'>
                    <h2 className='text-lg'>Order summary</h2>
                    <div className='flex'>
                        <span className='flex-1 font-light text-sm text-neutral-600'>Item Count</span>
                        <span>
                            {total}
                        </span>
                    </div>
                    <div className='flex'>
                        <span className='flex-1'>Order Total</span>
                        <span>
                            ${price}
                        </span>
                    </div>
                    {
                        items.length == 0 ? <Button className="w-full mt-auto rounded-[8px]" size="lg" variant="default" asChild>
                            <Link href="/products">Continue shopping</Link>
                        </Button>
                            : <Button className="w-full mt-auto rounded-[8px]" size="lg" variant="default" onClick={payHandler}>Checkout</Button>
                    }
                </div>
            </section>
        </main>
    )
}
