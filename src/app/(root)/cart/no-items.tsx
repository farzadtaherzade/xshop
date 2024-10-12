import { Minus, ShoppingCart } from 'lucide-react'
import React from 'react'

export default function NoItems() {
    return (
        <div className='w-full h-full flex flex-col items-center space-y-4 justify-center rounded-lg border dark:border-opacity-5 dark:border-neutral-100'>
            <section className='relative'>
                <ShoppingCart className='w-12 h-12' />
                <Minus className='w-24 h-24 absolute -left-6 -top-6 m-auto start rotate-45' />
            </section>
            <span className='text-neutral-800 text-opacity-85 dark:text-opacity-85 dark:text-neutral-100'>The Cart is empty</span>
        </div>
    )
}
