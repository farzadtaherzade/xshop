'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/hooks/use-cart'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Page() {
    const router = useRouter()
    const { items } = useCartStore()
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
        <main>
            <h1 className='text-3xl font-bold'>Shopping Cart</h1>
            <section className='grid grid-cols-12 mt-12'>
                <div className='col-span-9 w-full'>
                    dsad
                </div>
                <div className='col-span-3 w-full bg-white drop-shadow-md space-y-5 p-4 rounded-lg'>
                    <h2>Order summary</h2>
                    <Separator />
                    <div className='flex'>
                        <span className='flex-1'>Item Count</span>
                        <span>
                            {total}
                        </span>
                    </div>
                    <div className='flex'>
                        <span className='flex-1'>Price</span>
                        <span>
                            ${price}
                        </span>
                    </div>
                    {
                        items.length == 0 ? <Button className="w-full mt-auto rounded-[8px]" size="lg" variant="default">continue shopping</Button>
                            : <Button className="w-full mt-auto rounded-[8px]" size="lg" variant="default" onClick={payHandler}>Pay</Button>
                    }
                </div>
            </section>
        </main>
    )
}
