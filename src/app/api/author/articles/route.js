import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = parseInt(session.user.id); // ✅ convert to number

  const articles = await prisma.article.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json({ articles }); // ✅ return as object
}
