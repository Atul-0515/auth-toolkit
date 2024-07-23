"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";




export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: "Invalid fields!" };

  const { email, password } = validatedFields.data;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      routeTo: DEFAULT_LOGIN_REDIRECT,
    })

  } catch (error) {
    if (error instanceof AuthError)
      return { error: "Invalid Email or Password!" }
    throw error;
  }

  return { success: "Successfully Logged in!" };


};