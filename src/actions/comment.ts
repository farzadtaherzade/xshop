"use server";

import { CommentWithUser } from "@/app/(root)/p/[slug]/comments";
import { getSession } from "@/lib/dal";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type FormState = {
  message?: string;
  fields?: Record<string, string>;
  comment?: CommentWithUser;
};

function pause(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const schema = z.object({
  text: z.string().min(10, {
    message: "Text must be at least 10 characters.",
  }),
  rate: z.string(),
  productId: z.string().refine((s) => {
    if (!s) return false;
    return true;
  }),
});

export async function createComment(data: FormData) {
  await pause(5000);

  const formData = Object.fromEntries(data);
  const parsed = schema.safeParse(formData);
  const session = await getSession();

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return {
      message: "Invalid form data",
      fields,
    };
  }

  if (!session)
    return {
      message: "Anuthorized",
    };

  const { text, rate, productId } = parsed.data;

  try {
    const comment = await prisma.comment.create({
      data: {
        productId,
        text,
        rate: Number(rate),
        approved: true,
        userId: session.userId,
      },
      include: {
        User: true,
      },
    });
  } catch (error) {
    return {
      message: "Somthing went wrong",
    };
  } finally {
    revalidatePath("/");
    return {
      message:
        "Your comment created. when your comment approved we will noitce your via email",
    };
  }
}
