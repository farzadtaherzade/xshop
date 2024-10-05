import { getSession } from "@/lib/dal"
import { ModeToggle } from "../mode-toggle"
import Link from "next/link"
import { CartSidebar } from "../cart-sidebar"
import Container from "../ui/container"
import { UserNav } from "./user-nav"

export default async function Nav() {
    const session = await getSession()

    return (
        <header className="w-full py-10">
            <Container>
                <div className="flex justify-between items-center">
                    <Link href="/">logo</Link>
                    <nav>
                        <Link href='/products'>
                            Products
                        </Link>
                    </nav>
                    <div className="flex space-x-4 items-center">
                        <ModeToggle />
                        <CartSidebar session={session} />
                        <UserNav session={session} />
                    </div>
                </div>
            </Container>
        </header>
    )
}
