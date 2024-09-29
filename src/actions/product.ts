"use server";

import { getSession } from "@/lib/dal";
import prisma from "@/lib/db";
import { utapi } from "@/actions/uploadthing";
import { revalidatePath } from "next/cache";

export const createProduct = async (
  title: string,
  description: string,
  published: boolean,
  slug: string,
  price: number,
  formData: FormData
) => {
  const session = await getSession();
  if (!session) return { error: "not authorized" };

  const checkSlug = await prisma.product.findUnique({
    where: {
      slug,
    },
  });
  if (checkSlug) return { error: "Slug is not unique!" };
  const files = formData.getAll("files") as File[];
  if (!files) return { error: "please uploaded images for the product" };

  const response = await utapi.uploadFiles(files);
  if (!response) return { error: "please uploaded images for the product" };

  const images = response.map(({ data }) => {
    return {
      key: data?.key as unknown as string,
      url: data?.appUrl as unknown as string,
      name: data?.name as unknown as string,
    };
  });

  const product = await prisma.product.create({
    data: {
      price,
      description,
      published,
      title,
      slug,
      images: images,
      authorId: session.userId,
    },
  });
  return {
    product,
    message: "product created successfully",
    status: 201,
    error: null,
  };
};

export const deleteProduct = async (id: string) => {
  const session = await getSession();
  if (!session) return { error: "not authorized" };

  await prisma.product.delete({
    where: {
      authorId: session.userId,
      id,
    },
  });

  revalidatePath("/profile/products");

  return {
    message: "deleted successfully",
    error: null,
  };
};
