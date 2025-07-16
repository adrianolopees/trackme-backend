import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Validações mínimas para evitar bugs silenciosos
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USERNAME;
const dbPass = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = Number(process.env.DB_PORT);
const dbDialect = process.env.DB_DIALECT as Dialect;

if (!dbName || !dbUser || !dbPass || !dbHost || !dbPort || !dbDialect) {
  throw new Error(
    "🛑 Variáveis de ambiente do banco de dados estão ausentes ou incorretas."
  );
}

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
  logging: false,
});

export default sequelize;
