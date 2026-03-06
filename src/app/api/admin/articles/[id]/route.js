import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const article = await prisma.article.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json({ article });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 },
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const article = await prisma.article.update({
      where: {
        id: Number(id),
      },
      data: {
        status: body.status,
      },
    });

    return NextResponse.json({ success: true, article });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 },
    );
  }
}
