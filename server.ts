import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.get("/products", async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    // where: { name: { equals: "T-Shirt" } },
    //where: { price: { gt: 1000, lt: 20000 } },
    /*
    include: {
      reviews: {
        select: {
          text: true,
          rating: true,
        },
      },
    },
    */
    select: {
      name: true,
      description: true,
      price: true,
      reviews: {
        select: {
          text: true,
          rating: true,
        },
      },
    },
  });
  res.json({ products });
});

app.post("/products", async (req: Request, res: Response) => {
  const { body } = req;
  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
    },
  });
  res.json({ product });
});

app.post("/reviews", async (req: Request, res: Response) => {
  const { body } = req;
  const product = await prisma.review.create({
    data: {
      text: body.text,
      rating: body.rating,
      product: {
        connect: {
          id: body.productId,
        },
      },
    },
  });
  res.json({ product });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});

process.on("exit", () => prisma.$disconnect());
