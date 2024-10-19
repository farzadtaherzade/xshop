import { ArchiveIcon } from 'lucide-react'
import React from 'react'

export default function NotFoundComment() {
    return (
        <div className='w-full h-full flex flex-col items-center space-y-4 py-6 justify-center rounded-lg border dark:border-opacity-5 dark:border-neutral-100'>
            <ArchiveIcon className='w-12 h-12' />
            <span className='text-neutral-800 text-opacity-85 dark:text-opacity-85 dark:text-neutral-100'>The Cart is empty</span>
        </div>
    )
}
