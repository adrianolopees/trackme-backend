import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USERNAME || "",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as any, // geralmente 'postgres'
    logging: false,
  }
);

export default sequelize;
