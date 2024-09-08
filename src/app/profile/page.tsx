import React from 'react'
import { getSession } from '../../lib/dal'

export default async function page() {
    const user = await getSession()

    if (!user) return null

    return (
        <div>
            {user?.email}
        </div>
    )
}
