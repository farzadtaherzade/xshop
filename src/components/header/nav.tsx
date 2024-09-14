import { getSession } from "@/lib/dal"
import { ModeToggle } from "../mode-toggle"
import LogoutButton from "../logout-button"
import Link from "next/link"

export default async function Nav() {
    const session = await getSession()

    return (
        <header className="w-full py-10">
            <div className="md:container md:mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link href="/">logo</Link>
                    <nav>
                        <Link href='/p'>
                            Products
                        </Link>
                    </nav>
                    <div className="flex space-x-4 items-center">
                        <LogoutButton session={session} />
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}
