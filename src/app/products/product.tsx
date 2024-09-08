import { type Product } from '@prisma/client'
import React from 'react'

export default function Product(product: Product) {
    return (
        <div>{product.title}</div>
    )
}
