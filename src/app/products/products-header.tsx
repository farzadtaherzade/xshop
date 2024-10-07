'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Columns, Grid2X2 } from 'lucide-react'
import React, { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"


export default function ProductsHeader() {
  const searchParams = useSearchParams()
  const sortOptions = searchParams.get("sort") ?? "latest"
  const statusOptions = searchParams.get("status") ?? "ALL"
  const router = useRouter()
  const pathname = usePathname()
  const [position, setPosition] = useState(statusOptions)

  return (
    <div className='flex w-full justify-between'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Filters</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filters Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={(value) => {
            setPosition(value)
            router.push(`${pathname}?status=${value}&sort=${sortOptions}`)
          }}>
            <DropdownMenuRadioItem value="CURRENT">Current</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ENDING">Ending</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="EXPIRED">Expired</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ALL">All</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <section className='flex items-center gap-x-4'>
        <Grid2X2 className='text-opacity-50 text-neutral-950 dark:text-neutral-50 dark:text-opacity-60' />
        <Columns className=' text-neutral-950 dark:text-neutral-50' />
      </section> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="lg">
            Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Sorts</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`${pathname}?sort=latest`)}
            className={cn(
              {
                "bg-muted": sortOptions == "latest"
              })}
          >Latest</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`${pathname}?sort=popular`)}
            className={cn({
              "bg-muted": sortOptions == "popular"
            })}
          >Popular</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`${pathname}?sort=low`)}
            className={cn({
              "bg-muted": sortOptions == "low"
            })}
          >Price: Low to High</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`${pathname}?sort=high`)}
            className={cn({
              "bg-muted": sortOptions == "high"
            })}
          >Price: High to Low</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
