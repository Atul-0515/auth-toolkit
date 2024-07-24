import { db } from "@/lib/db";

export const getVerificationByEmail = async (email: string) => {
  try {
    const verificationToken = db.verificationToken.findFirst({
      where: { email },
    })
    return verificationToken;
  } catch {
    return null;
  }
}


export const getVerificationByToken = async (token: string) => {
  try {
    const verificationToken = db.verificationToken.findUnique({
      where: { token },
    })
    return verificationToken;
  } catch {
    return null;
  }
}