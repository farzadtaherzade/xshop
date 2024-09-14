import prisma from "@/lib/db";
// import { Product } from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SlashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";


const getProduct = async (slug: string) => {
    const product = await prisma.product.findUnique({
        where: {
            slug
        }
    })
    if (!product) return null

    // const data = await fetch(`/api/product/${slug}`)
    // const product: Product = await data.json()
    // if (data.status === 404) return null
    return product
}

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;

    const product = await getProduct(slug);

    return {
        title: product?.title,
        description: product?.description,
    };
};

export default async function Page({ params }: { params: { slug: string } }) {
    const product = await getProduct(params.slug)
    if (!product) return notFound()

    return (
        <main>
            <div className="my-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/p">Products</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <SlashIcon />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage>{product.slug}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <section className="flex flex-col lg:flex-row items-start gap-y-14 h-full">
                <div className="lg:flex-1 h-[55vh] w-full relative">
                    <Image src={product.images[0]} alt={product.slug} fill className="h-full w-full rounded-lg object-cover object-center" />
                </div>
                <div className="flex flex-1 lg:max-w-[600px] flex-col h-full gap-6 lg:px-20 items-start justify-end lg:py-8">
                    <h1 className="font-bold text-5xl">{product.title}</h1>
                    <p className="font-normal text-neutral-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur, blanditiis, perferendis velit dolor ducimus nihil beatae libero necessitatibus reprehenderit esse nam consequatur, numquam officia maxime neque mollitia amet. Voluptatum sit, sunt tempora asperiores harum magnam atque cumque ab necessitatibus architecto ipsam laboriosam. Eaque eos, accusantium quod eveniet eligendi laudantium voluptates!</p>
                    <p className="font-bold text-2xl tracking-wide">${product.price}</p>
                    <Button variant="outline" size="lg" className="mt-auto w-full">Add To Cart</Button>
                </div>
            </section>
        </main>
    )
}