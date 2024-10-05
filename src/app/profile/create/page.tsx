import { Metadata } from 'next'
import React from 'react'
import ProductForm from './product-form'
import prisma from '@/lib/db'
import { ImageJson } from '@/lib/types'

export const metadata: Metadata = {
    title: 'Create',
    description: 'Create new product',
}

export default async function page({ searchParams }: { searchParams: { id: string } }) {
    const id: string = searchParams.id
    const product = await prisma.product.findUnique({
        where: {
            id
        },
        select: {
            title: true,
            description: true,
            price: true,
            published: true,
            slug: true,
            images: true,
        }
    })

    if (product) return (
        <div>
            <ProductForm product={{
                ...product,
                images: product.images as unknown as ImageJson[]
            }} />
        </div>
    )

    return (
        <div>
            <ProductForm />
        </div>
    )
}
