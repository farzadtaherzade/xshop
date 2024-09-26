import { CartItem as Item, useCartStore } from '@/hooks/use-cart'
import Image from 'next/image'
import React from 'react'

export default function CartItem({ item }: { item: Item }) {
    const { removeItem } = useCartStore()

    return (
        <div className='py-4'>
            <div className='grid grid-cols-[90px_1fr] gap-x-5 p-1'>
                <div className='w-full rounded-sm'>
                    <Image src={item.image} alt={item.id} width="100" height="100" className='w-[90px] h-[85px] rounded-sm object-fill' />
                </div>
                <div className='flex flex-col '>
                    <div className='flex justify-between font-medium text-base flex-1'>
                        <h4>{item.title}</h4>
                        <p>${item.price}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-sm font-medium text-neutral-500 dark:text-neutral-700'>Qty {item.quantity}</p>
                        <button
                            className='cursor-pointer text-sm font-medium text-destructive dark:text-red-500'
                            onClick={() => removeItem(item.id)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
