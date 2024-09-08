import { Product } from '@prisma/client'
import React from 'react'

export default async function page() {
    const data = await fetch('/api/products', {})
    const products: Product[] = await data.json()

    return (
        <div>
            {
                products.map((p) => (
                    <p key={p.id}>{p.title}</p>
                ))
            }
        </div>
    )
}
