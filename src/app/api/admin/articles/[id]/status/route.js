import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { status } = body;

    const article = await prisma.article.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        status: status,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
