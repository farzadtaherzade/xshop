'use client'

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { type SessionType } from "@/lib/definitions";
import Link from "next/link";

export default function LogoutButton({ session }: { session: SessionType }) {
    return (
        <form action={logout}>
            {session?.isAuth ? <Button type="submit">
                logout
            </Button> : <Link href="/signin">signin</Link>}
        </form>
    )
}
