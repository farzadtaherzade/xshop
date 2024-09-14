import { type Product } from '@prisma/client'
import React from 'react'
import ProductCard from './product-card'

const getProducts = async () => {
    const data = await fetch('http://localhost:3000/api/products', {})
    if (data.ok) {
        const { products } = await data.json()
        return products
    }
    return []
}

export default async function page() {
    const products: Product[] = await getProducts()

    return (
        <main className='py-5'>
            <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </section>
        </main>
    )
}
