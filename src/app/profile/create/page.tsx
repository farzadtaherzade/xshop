import { Metadata } from 'next'
import React from 'react'
import ProductForm from './product-form'

export const metadata: Metadata = {
    title: 'Create Product',
    description: 'Create new product',
}

export default function page() {
    return (
        <div>
            <ProductForm />
        </div>
    )
}
