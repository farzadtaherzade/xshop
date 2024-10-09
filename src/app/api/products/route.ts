import prisma from "@/lib/db";
import { Status } from "@prisma/client";
import { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(requeset: NextRequest) {
  const sort = requeset.nextUrl.searchParams.get("sort") ?? "latest";
  const status = requeset.nextUrl.searchParams.get("status") as Status;
  let where = {};
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

  if (Object.values(Status).includes(status)) {
    where = {
      status,
    };
  }
  const products = await prisma.product.findMany({
    where,
    orderBy,
  });
  return Response.json({ products });
}
