import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true },
    });

    return NextResponse.json({
      session: {
        user: session.user,
        expires: session.expires,
      },
      user: user ? {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        subscription: user.subscription,
      } : null,
    });
  } catch (error) {
    console.error("Debug API error:", error);
    return NextResponse.json(
      { error: "Failed to get debug info" },
      { status: 500 }
    );
  }
}
