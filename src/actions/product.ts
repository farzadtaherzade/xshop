"use server";

import { getSession } from "@/lib/dal";
import prisma from "@/lib/db";
import { utapi } from "@/actions/uploadthing";
import { revalidatePath } from "next/cache";
import { ImageJson } from "@/lib/types";
import { InputJsonValue } from "@prisma/client/runtime/library";

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

export const editProduct = async (
  title: string,
  description: string,
  published: boolean,
  slug: string,
  price: number,
  currentImages: string[],
  oldImages: ImageJson[],
  formData: FormData
) => {
  const session = await getSession();
  if (!session) return { error: "not authorized" };

  const files = formData.getAll("files") as File[];

  const images: InputJsonValue[] = oldImages.filter((c) => {
    for (const key of currentImages) {
      return key === c.url;
    }
  }) as unknown as InputJsonValue[];

  if (files) {
    const response = await utapi.uploadFiles(files);
    if (!response) return { error: "Error happend while uploading files" };

    response.map(({ data }) => {
      images.push({
        key: data?.key as unknown as string,
        url: data?.appUrl as unknown as string,
        name: data?.name as unknown as string,
      });
    });
  }

  const product = await prisma.product.update({
    where: {
      slug,
      authorId: session.userId,
    },
    data: {
      title,
      description,
      published,
      price,
      slug,
      images,
    },
  });
  return {
    product,
    message: "product updated successfully",
    status: 200,
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
