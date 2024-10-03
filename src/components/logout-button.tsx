'use client'

import { logout } from "@/actions/auth";
import { ReactNode } from "react";

export default function LogoutButton({ children }: { children: ReactNode }) {
    return (
        <form action={logout} className="w-full">
            {children}
        </form>
    )
}
