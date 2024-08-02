import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    // console.log(url.pathname);
    if (url.pathname === "/") {
        url.pathname = "/";
        return NextResponse.rewrite(url, {
            status: 200,
        });
    }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*",
// };
