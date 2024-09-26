'use client'

import { Button } from "@/components/ui/button"
import { CartItem, useCartStore } from "@/hooks/use-cart"
import { useEffect, useState } from "react"

export default function AddToCartButton({ item }: { item: CartItem }) {
  const { addItem } = useCartStore()
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  return (
    <Button
      variant="outline"
      size="lg"
      className="mt-auto w-full"
      onClick={() => {
        addItem(item)
        setIsSuccess(true)
      }}
    >
      {isSuccess ? "Added!" : "Add to cart"}
    </Button>
  )
}
