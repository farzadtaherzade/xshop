'use client'

import { Button } from "@/components/ui/button"
import { CartItem, useCartStore } from "@/hooks/use-cart"

export default function AddToCartButton({ item }: { item: CartItem }) {
  const { addItem, items } = useCartStore()
  console.log(items)
  return (
    <Button
      variant="outline"
      size="lg"
      className="mt-auto w-full"
      onClick={() => addItem(item)}
    >Add To Cartdasdasd</Button>
  )
}
