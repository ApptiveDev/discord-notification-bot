import dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL, DIRECT_URL, DISCORD_TOKEN, DISCORD_CLIENT_ID } =
  process.env;

if (!DATABASE_URL || !DIRECT_URL || !DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error("Missing environment variables");
}

const config = {
  databaseUrl: DATABASE_URL,
  directUrl: DIRECT_URL,
  token: DISCORD_TOKEN,
  clientId: DISCORD_CLIENT_ID,
};

export default config;
