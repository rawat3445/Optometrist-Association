import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      articles,
      count: articles.length,
    });
  } catch (error) {
    console.error("FETCH ARTICLES ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    // ✅ get logged-in user
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // find user in DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const formData = await req.formData();

    const title = formData.get("title");
    const articleType = formData.get("articleType");
    const keywords = formData.get("keywords");
    const abstract = formData.get("abstract");
    const introduction = formData.get("introduction");
    const methods = formData.get("methods");
    const results = formData.get("results");
    const discussion = formData.get("discussion");
    const conclusion = formData.get("conclusion");
    const references = formData.get("references");
    const pdf = formData.get("pdf");

    let pdfPath = null;

    if (pdf && pdf.name) {
      const bytes = await pdf.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");

      const uniqueName = Date.now() + "-" + pdf.name;
      const filePath = path.join(uploadDir, uniqueName);

      await writeFile(filePath, buffer);

      pdfPath = `/uploads/${uniqueName}`;
    }

    // ✅ Save article with REAL authorId
    const article = await prisma.article.create({
      data: {
        title,
        articleType,
        keywords,
        abstract,
        introduction,
        methods,
        results,
        discussion,
        conclusion,
        references,
        pdfPath,
        authorId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      article,
    });
  } catch (error) {
    console.error("ARTICLE SUBMISSION ERROR:", error);

    return NextResponse.json(
      { error: "Failed to submit article" },
      { status: 500 },
    );
  }
}
