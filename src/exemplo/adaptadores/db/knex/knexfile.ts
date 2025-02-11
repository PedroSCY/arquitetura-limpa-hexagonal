import dotenv from "dotenv";
import type { Knex } from "knex";

dotenv.config({path: "../../../../../.env"});

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL || "postgres://postgres:postgres123@localhost:5432/arquitetura",
    migrations: {
      tableName: "knex_migrations",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config;
