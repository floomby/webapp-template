import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { type ServerMessage } from "common";

import env from "./env.js";
import { enforceAdmin } from "./middleware.js";

const app = express();

const sendEvent1 = (client: Response, content: string) => {
  client.write(
    `data:${JSON.stringify({
      type: "event1",
      content,
    } as ServerMessage)}\n\n`
  );
};

const sendEvent2 = (client: Response, value: number) => {
  client.write(
    `data:${JSON.stringify({
      type: "event2",
      value,
    } as ServerMessage)}\n\n`
  );
};

type State = {
  clients: Response[];
};

const state: State = {
  clients: [],
};

if (env.USE_CORS) {
  app.use(cors());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/events", (req: Request, res: Response) => {
  // Set headers for SSE
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Add this client to the clients list
  state.clients.push(res);

  // Handle client disconnect
  req.on("close", () => {
    const index = state.clients.indexOf(res);
    if (index !== -1) {
      state.clients.splice(index, 1);
    }

    console.log(
      "client disconnected, clients remaining: ",
      state.clients.length
    );
  });
});

let event1Count = 0;
let event2Value = 0;

app.post("/createMessage", (req: Request, res: Response) => {
  try {
    // randomly choose between event1 and event2
    const event = Math.random() < 0.5 ? "event1" : "event2";
    if (event === "event1") {
      const message = `event1 message ${event1Count++}`;
      for (const client of state.clients) {
        sendEvent1(client, message);
      }
    } else {
      for (const client of state.clients) {
        sendEvent2(client, event2Value++);
      }
    }
    res.status(200).json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(env.PORT, () => {
  console.log(`Backend listening on port ${env.PORT}`);
});
