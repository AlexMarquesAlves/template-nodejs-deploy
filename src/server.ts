import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();
const app = fastify();

app.get("/users", async () => {
  const users = await prisma.user.findMany();

  return { users };
});

app.post("/users", async (request, reply) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  const { name, email } = createUserSchema.parse(request.body);

  await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return reply.status(201).send();
});

const PORT = 3333;

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP server is running on port: ${PORT}`);
  });
