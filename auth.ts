import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

if (!googleClientId || !googleClientSecret) {
  console.warn("Warning: Google OAuth credentials not configured. Auth will not work.")
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers:
    googleClientId && googleClientSecret
      ? [
          Google({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          }),
        ]
      : [],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      return baseUrl + "/dashboard"
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "development-secret-key-change-in-production",
}) || {
  handlers: {
    GET: async () => new Response("Not configured", { status: 503 }),
    POST: async () => new Response("Not configured", { status: 503 }),
  },
  auth: async () => null,
  signIn: async () => null,
  signOut: async () => null,
}
