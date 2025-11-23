import type { NextRequest } from "next/server"
import { NextResponse as NextResponseImport } from "next/server"

// Google OAuth will work via the /auth/callback route instead
export async function middleware(request: NextRequest) {
  return NextResponseImport.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
