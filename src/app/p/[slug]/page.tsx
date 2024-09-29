import prisma from "@/lib/db";
// import { Product } from "@prisma/client";
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
import AddToCartButton from "./add-to-cart-button";
import ImagesCarousel from "./images";
import { ImageJson } from "@/lib/types";

const getProduct = async (slug: string) => {
    const product = await prisma.product.findUnique({
        where: {
            slug
        }
    })
    if (!product) return null
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
                    <ImagesCarousel alt={product.slug} images={product.images as unknown as ImageJson[]} mainImage={product.images[0] as unknown as ImageJson} />
                </div>
                <div className="flex flex-1 lg:max-w-[600px] flex-col h-full gap-6 lg:px-20 items-start justify-end lg:py-8">
                    <h1 className="font-bold text-5xl">{product.title}</h1>
                    <p className="font-normal text-neutral-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur, blanditiis, perferendis velit dolor ducimus nihil beatae libero necessitatibus reprehenderit esse nam consequatur, numquam officia maxime neque mollitia amet. Voluptatum sit, sunt tempora asperiores harum magnam atque cumque ab necessitatibus architecto ipsam laboriosam. Eaque eos, accusantium quod eveniet eligendi laudantium voluptates!</p>
                    <p className="font-bold text-2xl tracking-wide">${product.price}</p>
                    <AddToCartButton item={{
                        id: product.id,
                        title: product.title,
                        quantity: 1,
                        image: product.images[0] as unknown as ImageJson,
                        price: product.price
                    }} />
                </div>
            </section>
        </main>
    )
}