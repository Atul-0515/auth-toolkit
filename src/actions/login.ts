"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";




export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: "Invalid fields!" };

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: "Invaid email or password!" };

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(existingUser.email, verificationToken.token);

    return { success: "Confirmation email sent!" };
  }

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

};