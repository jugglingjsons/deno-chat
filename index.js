import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

const messages = [];

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Basic chat server!";
  })
  .get("/messages", (context) => {
    context.response.body = messages
  })
  .post("/book/:id", async (context) => {
    const message = await context.request.body().value;
    messages.push(message)
  });

app.use(router.routes());
app.use(router.allowedMethods());

addEventListener("fetch", app.fetchEventHandler());