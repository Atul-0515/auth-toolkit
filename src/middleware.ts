import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  // req.auth
  console.log("ROUTE:", req.nextUrl.pathname);
  console.log("isLoggedIn:", isLoggedIn);
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}