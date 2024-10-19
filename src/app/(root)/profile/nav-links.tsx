'use client'

import { SessionType } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { BoxesIcon, ListOrderedIcon, PinIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const links: {
    icons: ReactNode;
    href: string;
    label: string;
    protected: boolean;
}[] = [
        {
            href: "/profile/create",
            icons: <PinIcon className="w-5 h-5" />,
            label: "Create",
            protected: true
        },
        {
            href: "/profile/products",
            icons: <BoxesIcon className="w-5 h-5" />,
            label: "Products",
            protected: true
        },
        {
            href: "/profile/orders",
            icons: <ListOrderedIcon className="w-5 h-5" />,
            label: "Orders",
            protected: false
        },
        {
            href: "/profile/setting",
            icons: <SettingsIcon className="w-5 h-5" />,
            label: "Setting",
            protected: false
        },
    ]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NavLinks({ session }: { session: SessionType }) {
    const pathname = usePathname()

    return (
        <nav className="flex gap-4 w-full items-center justify-start">
            {links.map((link, i) => session?.isAdmin ? <Link href={link.href} className={cn(
                "flex items-center flex-col text-sm hover:bg-red-700 hover:bg-opacity-40 rounded-[6px] p-2 duration-200",
                {
                    "bg-primary text-primary-foreground": pathname == link.href
                }
            )} key={i}>
                {link.icons}
                <span>
                    {link.label}
                </span>
            </Link> : !link.protected && <Link href={link.href} className={cn(
                "flex items-center flex-col text-sm hover:bg-red-700 hover:bg-opacity-40 rounded-[6px] p-2 duration-200",
                {
                    "bg-primary text-primary-foreground": pathname == link.href
                }
            )} key={i}>
                {link.icons}
                <span>
                    {link.label}
                </span>
            </Link>)}
        </nav>
    )
}