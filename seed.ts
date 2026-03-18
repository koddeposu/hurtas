import { seed } from "drizzle-seed";
import * as schema from "./src/db/schema";
import { db } from "@/db/drizzle.js";

const main = async () => {
  // await seed(db, schema).refine((funcs) => ({}));
};

main();
