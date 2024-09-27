import { Button } from '@/components/ui/button'
import { type Product } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import ProductImage from '../../assets/901225_7195.webp'
import Link from 'next/link'

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className='max-w-sm relative w-full flex flex-col items-center gap-y-1'>
            <Link href={`/p/${product.slug}`} className='relative w-full rounded-2xl h-[37vh]'>
                <img src={product.images[0]} alt='shop' className='w-full h-full rounded-2xl' />
            </Link>
            <Link href={`/p/${product.slug}`}>{product.title}</Link>
            <p>{product.price}</p>
            <Button variant="outline" size="sm" className='mt-2'>
                Shop Now
            </Button>
        </div>
    )
}
