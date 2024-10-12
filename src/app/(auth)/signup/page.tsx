'use client'

import { signup } from '@/actions/auth'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { SubmitButton } from '../signin/page'

export default function SignupForm() {
    const [state, action] = useFormState(signup, undefined)
    return (
        <form action={action} className='w-full space-y-5'>
            <h1 className='text-5xl font-semibold text-center'>Sign up</h1>

            <div className='space-y-2'>
                <label htmlFor="email">Email</label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" />
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}

            <div className='space-y-2'>
                <label htmlFor="username">Username</label>
                <Input type='text' id="username" name="username" placeholder="example" />
            </div>
            {state?.errors?.username && <p>{state.errors.username}</p>}


            <div className='space-y-2'>
                <label htmlFor="password">Password</label>
                <Input id="password" name="password" type="password" />
            </div>
            {state?.errors?.password && (
                <div>
                    <p>Password must:</p>
                    <ul>
                        {state.errors.password.map((error) => (
                            <li key={error}>- {error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <SubmitButton />
            <p className='absolute bottom-10 translate-x-2/3 dark:text-opacity-65 dark:text-white'>Already have an account? <Link href="/signin" className='undeline font-bold dark:text-white dark:text-opacity-100'>Sign in</Link></p>
        </form>
    )
}
