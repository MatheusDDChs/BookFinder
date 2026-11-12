import Fastify from "fastify";
import { get } from "node:http";
import { db } from "./config/conection.js";
import cors from "@fastify/cors";

const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: "http://localhost:5173",
});

app.get("/health", async (request, reply) => {
  return reply.status(200).send({
    status: "OK",
    message: "BookFinder API is running",
  });
});

app.get("/about", async (request, reply) => {
  return reply.status(200).send({
    name: "BookFinder",
    description: "Sua biblioteca digital de programação",
    version: "1.0.0",
  });
});

app.get("/db-test", async (request, reply) => {
  const result = await db.query("SELECT NOW()");

  return reply.status(200).send({
    connected: true,
    databaseTime: result.rows[0].now,
  });
});

app.get("/books", async (request, reply) => {
  const books = await db.query("SELECT * FROM books;");

  const livro = books.rows;

  return reply.status(200).send({
    livro,
  });
});

app.put;

const start = async () => {
  try {
    await app.listen({
      port: 3333,
      host: "0.0.0.0",
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
