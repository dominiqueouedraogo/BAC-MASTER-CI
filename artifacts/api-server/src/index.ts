import app from "./app";
import { logger } from "./lib/logger";
import { seedAnglaisLessons } from "./lib/seed-anglais";
import { seedSvtDLessons } from "./lib/seed-svt-d";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");

  seedAnglaisLessons().catch((e) =>
    logger.error({ err: e }, "Startup seed failed"),
  );

  seedSvtDLessons().catch((e) =>
    logger.error({ err: e }, "SVT D startup seed failed"),
  );
});
