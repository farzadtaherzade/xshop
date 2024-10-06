import prisma from "@/lib/db";
import { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(requeset: NextRequest) {
  const sort = requeset.nextUrl.searchParams.get("sort") ?? "latest";
  let orderBy = {};
  switch (sort) {
    case "popular":
      orderBy = {
        views: sort === "popular" ? "desc" : "asc",
      };
      break;
    case "latest":
      orderBy = {
        createdAt: sort === "latest" ? "desc" : "asc",
      };
      break;
    case "low":
      orderBy = {
        price: "asc",
      };
      break;
    case "high":
      orderBy = {
        price: "desc",
      };
      break;

    default:
      break;
  }
  console.log(sort);
  const products = await prisma.product.findMany({
    orderBy,
  });
  return Response.json({ products });
}
