import { authOptions } from "@/lib/authOption";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
