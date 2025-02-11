import dotenv from "dotenv";
import type { Knex } from "knex";



dotenv.config({path: "../../../../../.env"});

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: "postgres://postgres:postgres123@localhost:5432/arquitetura",
    migrations: {
      tableName: "knex_migrations",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  // staging: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // },

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // }
};

module.exports = config;
