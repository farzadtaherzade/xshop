import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { cache } from "react";
import prisma from "./db";

export const getSession = cache(async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) return null;

  return {
    isAuth: true,
    userId: session.userId as string,
    isAdmin: session.isAdmin as boolean,
    email: session.email as string,
    username: session.username as string,
  };
});

export const getUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: session.userId,
      },
      select: {
        password: false,
      },
    });

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
