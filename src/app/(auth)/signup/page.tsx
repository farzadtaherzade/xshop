'use client'

import { signup } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormState, useFormStatus } from 'react-dom'

export default function SignupForm() {
    const [state, action] = useFormState(signup, undefined)
    return (
        <form action={action} className='max-w-screen-lg mx-auto space-y-5'>
            <div>
                <label htmlFor="username">Username</label>
                <Input type='text' id="username" name="username" placeholder="Username" />
            </div>
            {state?.errors?.username && <p>{state.errors.username}</p>}


            <div>
                <label htmlFor="email">Email</label>
                <Input id="email" name="email" type="email" placeholder="Email" />
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}

            <div>
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
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending} variant="secondary" type="submit">
            Sign Up
        </Button>
    )
}