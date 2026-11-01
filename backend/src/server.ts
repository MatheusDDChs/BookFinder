import Fastify from "fastify";
import { get } from "node:http";

const app = Fastify({
  logger: true,
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
