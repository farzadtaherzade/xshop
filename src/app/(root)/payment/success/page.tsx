import Image from "next/image";
import DeliveryVector from '@/assets/vecteezy_3d-delivery-man-character-presenting-empty-phone-screen-and_36876805.png'
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
    return (
        <main className="flex items-center justify-between gap-6 flex-col-reverse md:flex-row">
            <section className="flex-1">
                <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold ">Thank You!</h1>
                <p className="text-lg sm:text-xl md:text-2xl -mt-2 p-3">You have just done the hardest!</p>

                <div className="space-y-8 mt-12 flex flex-col items-center sm:items-start">
                    <p className="text-xl font-semibold">What you want to do next?</p>

                    <div className="rounded-md shadow-sm space-x-5">
                        <Button variant="outline" size="lg" className="rounded-[6px]">
                            <Link href="/">
                                Go Back home
                            </Link>
                        </Button>
                        <Button variant="default" size="lg" className="rounded-[6px]">
                            <Link href="/products">
                                Explore More
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
            <Image src={DeliveryVector} alt="delivery guy" width={500} height={500} className="w-[500px] h-[500px]" />
        </main>
    )
}
