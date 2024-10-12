import Image from 'next/image';
import React from 'react'
import AuthImage from '@/assets/11740740_4834406.jpg'
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getSession } from '@/lib/dal';
import { redirect } from 'next/navigation';

export default async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession()
    if (session) return redirect('/profile/setting')

    return (
        <section className='w-full grid md:grid-cols-8 min-h-screen p-2'>
            <div className='w-full col-span-4 h-full relative'>
                <Image
                    alt="auth"
                    src={AuthImage}
                    placeholder="blur"
                    quality={100}
                    fill
                    className='object-cover w-full h-full rounded-[3rem]'
                />
                <Link href='/' className='absolute left-8 top-8 flex items-center gap-x-2 text-sm'>
                    <ArrowLeft className='w-5 h-5' /> <span>Back</span>
                </Link>
            </div>
            <div className='w-full md:max-w-[520px] mx-auto col-span-4 flex items-center h-full relative px-5'>
                {children}
            </div>
        </section>
    )
}
