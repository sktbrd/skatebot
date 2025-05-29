import dotenv from "dotenv";
dotenv.config();

import { startServer } from "./server";

async function main() {
  // Only start the server. All heavy work is now UI/API-driven.
  startServer("");
}

main().catch(console.error);