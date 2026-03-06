import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const articles = await prisma.article.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}
