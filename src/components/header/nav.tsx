import { getSession } from "@/lib/dal"
import { ModeToggle } from "../mode-toggle"
import LogoutButton from "../logout-button"
import Link from "next/link"
import { CartSidebar } from "../cart-sidebar"
import Container from "../ui/container"

export default async function Nav() {
    const session = await getSession()

    return (
        <header className="w-full py-10">
            <Container>
                <div className="flex justify-between items-center">
                    <Link href="/">logo</Link>
                    <nav>
                        <Link href='/p'>
                            Products
                        </Link>
                    </nav>
                    <div className="flex space-x-4 items-center">
                        <ModeToggle />
                        <CartSidebar />
                        <LogoutButton session={session} />
                    </div>
                </div>
            </Container>
        </header>
    )
}
