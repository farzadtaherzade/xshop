import React from 'react'
import NavLinks from './nav-links';
import { Separator } from '@/components/ui/separator';
import { getSession } from '@/lib/dal';
import { redirect } from 'next/navigation';

export default async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession()

    if (!session) return redirect('/auth/signin')

    return (
        <main className='max-w-screen-lg mx-auto'>
            <div>
                <NavLinks session={session} />
                <Separator className='my-3' />
            </div>
            {children}
        </main>
    )
}
