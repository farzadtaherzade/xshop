import React from 'react'
import { getSession } from '@/lib/dal'
import { redirect } from 'next/navigation'

export default async function page() {
    const session = await getSession()
    if (!session) return null
    redirect("/profile/setting")

    return (
        <div>
            {session?.email}
        </div>
    )
}
