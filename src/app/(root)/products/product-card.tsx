import { Button } from '@/components/ui/button'
import { type Product } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { ImageJson } from '@/lib/types'
import { priceFormating } from '@/lib/utils'

export default function ProductCard({ product }: { product: Product }) {
    const image = product.images[0] as unknown as ImageJson

    return (
        <div className='w-full relative flex flex-col items-center gap-y-1 overflow-hidden'>
            <Link href={`/p/${product.slug}`} className='relative w-full rounded-2xl min-h-[27rem] overflow-hidden'>
                <Image src={image.url} alt={image.name} fill className='w-full h-full rounded-2xl object-cover object-center transition-transform duration-300 transform hover:scale-125 peer' />
            </Link>
            <Link href={`/p/${product.slug}`} className='py-2'>{product.title}</Link>
            <p>{priceFormating(product.price)}</p>
            <Button variant="outline" size="sm" className='mt-2' asChild>
                <Link href={`/p/${product.slug}`}>
                    Shop Now
                </Link>
            </Button>
        </div>
    )
}
