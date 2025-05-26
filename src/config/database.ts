import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
console.log("DATABASE_URL =", process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  logging: false, // Ative se quiser ver os logs de SQL no terminal
});

export default sequelize;
