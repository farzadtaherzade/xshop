import { Status, type Product } from '@prisma/client'
import React from 'react'
import ProductCard from './product-card'
import { Metadata } from 'next'
import ProductsHeader from './products-header'

export const revalidate = 90

const getProducts = async (sort: string, status: Status) => {
    const data = await fetch(`${process.env.URL}/api/products?sort=${sort}&status=${status}`, {})
    if (data.ok) {
        const { products } = await data.json()
        return products
    }
    return []
}

export const metadata: Metadata = {
    title: 'Products',
    description: 'Latest Products',
}

export default async function page({ searchParams }: { searchParams: { sort: string, status: Status } }) {
    const sort = searchParams.sort ?? ""
    const status = searchParams.status
    const products: Product[] = await getProducts(sort, status)

    return (
        <main className='py-5 space-y-8 w-full'>

            <ProductsHeader />

            <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 items-center">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </section>
        </main>
    )
}
