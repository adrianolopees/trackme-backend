import dotenv from "dotenv";
dotenv.config();

import sequelize from "./config/database";
import "./models";
import app from "./app";

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");

    await sequelize.sync();
    console.log("🟢 Database connected and models synchronized!");

    const port = process.env.PORT || 3333;

    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  } catch (error) {
    console.error("❌  Error during server initialization:", error);
    process.exit(1);
  }
};

startServer();
