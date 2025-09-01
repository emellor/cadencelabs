import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "email" || account?.provider === "google") {
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      // If there's a callbackUrl in the URL, use it
      if (url.includes("callbackUrl=")) {
        try {
          const callbackUrl = new URL(url).searchParams.get("callbackUrl");
          if (callbackUrl?.startsWith("/")) {
            return `${baseUrl}${callbackUrl}`;
          }
        } catch (error) {
          console.log("Error parsing callback URL:", error);
        }
      }
      
      // Default redirects after successful authentication
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      
      // Default to paywall for new sign-ups, could be refined later
      return `${baseUrl}/paywall`;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/auth/error",
  },
  events: {
    async signIn({ user }) {
      console.log("New user signed up:", user.email);
    },
  },
};
