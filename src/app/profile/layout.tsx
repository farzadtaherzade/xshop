import React from 'react'

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className='max-w-screen-md mx-auto'>
            {children}
        </main>
    )
}
