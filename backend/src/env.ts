import * as z from "zod";
import { config } from "dotenv";

config({ path: "../.env" });

const schema = z.object({
  PORT: z.number().int().positive().min(1).max(65535),
  ADMIN_TOKEN: z.string(),
  USE_CORS: z.coerce.boolean(),
});

const env = {
  ...process.env,
  PORT: Number(process.env.PORT),
};

export default schema.parse(env);
