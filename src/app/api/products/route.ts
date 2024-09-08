import prisma from "@/lib/db";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(requeset: Request) {
  const products = await prisma.product.findMany({});
  console.log(products);
  return Response.json({ products });
}
