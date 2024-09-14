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
            <div className="my-4">
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
            <section className="flex flex-col md:flex-row gap-12">
                <div className="md:flex-1 h-[50vh] w-full relative">
                    <Image src={product.images[0]} alt={product.slug} fill className="h-full w-full rounded-lg object-cover object-center" />
                </div>
                <div className="flex flex-1 flex-col gap-6">
                    <h1 className="font-bold text-4xl">{product.title}</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quo odit culpa cumque facilis dolorem amet doloremque impedit minima voluptas, ipsum facere unde quod! Earum quae voluptates aperiam consequatur neque repellendus vitae maiores, id quisquam qui, illo non totam distinctio, accusantium dolorum expedita omnis rerum eum facere sit? Quae adipisci, quod suscipit provident perferendis eos eveniet commodi rerum nemo cupiditate tempora placeat possimus iste repudiandae. Consequuntur non odit quas blanditiis molestias voluptatem architecto, at exercitationem tempora ipsam esse mollitia iure quo, tempore amet! Consequatur cupiditate quaerat officia veritatis rem molestiae accusamus doloribus. Facilis amet saepe rerum modi aliquid, totam ut maxime, voluptatem, ratione ea atque quidem aperiam delectus deserunt quisquam nam quibusdam.</p>
                </div>
            </section>
        </main>
    )
}