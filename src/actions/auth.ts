"use server";

import prisma from "@/lib/db";
import {
  FormState,
  SigninFormSchema,
  SignupFormSchema,
} from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { username, email, password } = validatedFields.data;
  const oldUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (oldUser)
    return {
      message: "username or email already exist!",
    };

  const hasehd = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hasehd,
    },
  });

  await createSession(user.id, user.isAdmin, user.username, user.email);

  redirect("/profile");
}

export async function signin(state: FormState, formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validatedFields.data;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user)
    return {
      message: "email or password not valid!",
    };
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword)
    return {
      message: "email or password not valid!",
    };

  await createSession(user.id, user.isAdmin, user.username, user.email);
  redirect("/profile");
}

export async function logout() {
  deleteSession();
  redirect("/signin");
}
