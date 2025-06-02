
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)'])
const isProtectedRoute = createRouteMatcher(["/sign-in"])

export default clerkMiddleware(async (auth, req) => {
    const { userId, redirectToSignIn } = await auth()

    if (!userId && isProtectedRoute(req)) {
        // Add custom logic to run before redirecting

        return redirectToSignIn()
    }
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api)(.*)"],
};
