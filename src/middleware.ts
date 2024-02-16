import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/user",
    "/user/:username",
    "/how-is-strength-calculated",
    "/compare",
    "/compare/:userOne/:userTwo",
  ],
  async afterAuth(auth, req, _) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && !auth.isPublicRoute) {
      const url = req.nextUrl.origin;
      const data = await fetch(`${url}/api/user`, {
        method: "POST",
        body: JSON.stringify({ id: auth.userId }),
      });

      const users = await data.json();
      const attemptingToOnboard = req.url.includes("onboarding");

      // list of APIs a user can access when onboarding
      const allowedApis = ["/api/user/create", "/api/username/check"];

      const accessingAllowedApi = !!allowedApis.find((item) => {
        return req.url.includes(item);
      })?.length;

      // User has already onboarded and is trying to hit onboarding again
      if (attemptingToOnboard && users.length) {
        return NextResponse.redirect(new URL(url + "/dashboard"));
      }

      if (attemptingToOnboard || accessingAllowedApi) {
        // User is trying to access onboarding, allow it
        return NextResponse.next();
      } else {
        if (users.length) {
          // User has onboarded
          return NextResponse.next();
        } else {
          // User has not yet onboarded
          return NextResponse.redirect(new URL(url + "/onboarding"));
        }
      }
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
