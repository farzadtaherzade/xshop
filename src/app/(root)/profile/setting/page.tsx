import React from 'react'
import { ProfileForm } from './profile-form'
import { getSession } from '@/lib/dal'

export const generateMetadata = async () => {
    const session = await getSession()
    if (!session) return

    return {
        title: `Hello ${session.username}`,
        description: `Updating Setting`
    };
};

export default async function page() {
    const session = await getSession()
    if (!session) return null

    return (
        <main>
            <section className='mb-6'>
                <h1 className='font-bold text-3xl mb-2'>Settings</h1>
                <p className='text-opacity-50 text-neutral-950 dark:text-neutral-50 dark:text-opacity-60'>Manage your account settings and set e-mail preferences.</p>
            </section>
            <ProfileForm profile={{
                email: session.email,
                username: session.username
            }} />
        </main>
    )
}
