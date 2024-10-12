'use client'

import { signin } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'

export default function Page() {
    const [state, action] = useFormState(signin, undefined)

    return (
        <form action={action} className='w-full space-y-5'>
            <h1 className='text-5xl font-semibold text-center'>Welcome Back</h1>
            <div className='space-y-2'>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" />
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}

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
            <p>{state?.message && state?.message}</p>

            <p className='absolute bottom-10 translate-x-2/3 dark:text-opacity-65 dark:text-white'>Dont have an account? <Link href="/signup" className='undeline font-bold dark:text-white dark:text-opacity-100'>Sign up</Link></p>
            <SubmitButton />
        </form>
    )
}

export function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending} variant="secondary" className='w-full space-x-2' type="submit" size="lg">
            {pending && <LoaderCircle className='animate-spin' />}
            <span>Sign in</span>
        </Button>
    )
}