'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Columns, Grid2X2 } from 'lucide-react'
import React from 'react'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

export default function ProductsHeader() {
  const searchParams = useSearchParams()
  const sortOptions = searchParams.get("sort")
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className='flex w-full justify-between'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="lg">
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filters</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <section className='flex items-center gap-x-4'>
        <Grid2X2 className='text-opacity-50 text-neutral-950 dark:text-neutral-50 dark:text-opacity-60' />
        <Columns className=' text-neutral-950 dark:text-neutral-50' />
      </section>
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
