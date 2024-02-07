import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
 
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    debugger;
    if(auth.userId && auth.isPublicRoute) {
      let path = "/select-org";
      
      if (auth.orgId) {
        path = `/organization/${auth.orgId}`
      }

      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }

    if (!auth.userId && !auth.isPublicRoute) {
      debugger;
      console.log('aqui');
      console.log(req.url);
      return redirectToSignIn({returnBackUrl: req.url});
    }
    
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org"){
      const orgSelection = new URL("/select-org", req.url);
      return NextResponse.redirect(orgSelection);
    }

    if (req.nextUrl.pathname === "/") {
      return new Response("Welcome to the homepage!");
    }
  },
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};