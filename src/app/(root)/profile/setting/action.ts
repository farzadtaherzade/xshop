"use server";

import { getSession } from "@/lib/dal";
import prisma from "@/lib/db";
import { createSession } from "@/lib/session";

export const updateProfile = async (username: string, email: string) => {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const isExist = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email,
        },
        {
          username,
        },
      ],
    },
  });
  if (isExist?.email === email) {
    return {
      error: "We could'nt update your email. Eamil already exist try another",
    };
  } else if (isExist?.username === username) {
    return {
      error:
        "We could'nt update your username. Username already exist try another",
    };
  }

  const user = await prisma.user.update({
    where: {
      id: session.userId,
    },
    data: {
      email,
      username,
    },
  });
  await createSession(user.id, user.isAdmin, user.username, user.email);

  return {
    message: "updated successfully",
    user,
    error: null,
    status: 200,
  };
};
