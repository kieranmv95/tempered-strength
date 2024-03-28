import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { IUser } from '@/types/IUser';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/user',
    '/user/:username',
    '/sign-out',
    '/how-is-strength-calculated',
    '/compare',
    '/compare/:userOne/:userTwo',
    '/api/webhooks/stripe',
  ],
  async afterAuth(auth, req, _) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && !auth.isPublicRoute) {
      const url = req.nextUrl.origin;

      const data = await fetch(`${url}/api/user/${auth.userId}`);
      const user = (await data.json()) as IUser;

      const attemptingToOnboard = req.url.includes('onboarding');

      // list of APIs a user can access when onboarding
      const allowedApis = ['/api/user', '/api/username/check'];

      const accessingAllowedApi = !!allowedApis.find(item => {
        return req.url.includes(item);
      })?.length;

      // User has already onboarded and is trying to hit onboarding again
      if (attemptingToOnboard && user) {
        return NextResponse.redirect(new URL(url + '/dashboard'));
      }

      if (attemptingToOnboard || accessingAllowedApi) {
        // User is trying to access onboarding, allow it
        return NextResponse.next();
      } else {
        if (user) {
          // User has onboarded
          return NextResponse.next();
        } else {
          // User has not yet onboarded
          return NextResponse.redirect(new URL(url + '/onboarding'));
        }
      }
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
