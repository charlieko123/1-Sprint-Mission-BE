import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  await prisma.article.deleteMany({});
  await prisma.comment.deleteMany({});

  // 10개의 게시글 생성
  const articles = [];
  for (let i = 1; i <= 10; i++) {
    const article = await prisma.article.create({
      data: {
        title: `Article Title ${i}`,
        content: `Article Content ${i}`,
      },
    });
    articles.push(article);
  }

  // 각 게시글에 대해 10개의 댓글 생성
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];

    await prisma.comment.createMany({
      data: [
        {
          content: `Comment 1 for Article ${article.title}`,
          category: "BOARD",
          articleId: article.id,
        },
        {
          content: `Comment 2 for Article ${article.title}`,
          category: "BOARD",
          articleId: article.id,
        },
        {
          content: `Comment 3 for Article ${article.title}`,
          category: "MARKET",
          articleId: article.id,
        },
        {
          content: `Comment 4 for Article ${article.title}`,
          category: "MARKET",
          articleId: article.id,
        },
        {
          content: `Comment 5 for Article ${article.title}`,
          category: "BOARD",
          articleId: article.id,
        },
        {
          content: `Comment 6 for Article ${article.title}`,
          category: "BOARD",
          articleId: article.id,
        },
        {
          content: `Comment 7 for Article ${article.title}`,
          category: "MARKET",
          articleId: article.id,
        },
        {
          content: `Comment 8 for Article ${article.title}`,
          category: "MARKET",
          articleId: article.id,
        },
        {
          content: `Comment 9 for Article ${article.title}`,
          category: "BOARD",
          articleId: article.id,
        },
        {
          content: `Comment 10 for Article ${article.title}`,
          category: "MARKET",
          articleId: article.id,
        },
      ],
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
