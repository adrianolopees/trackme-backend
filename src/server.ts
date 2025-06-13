import dotenv from "dotenv";
import sequelize from "./config/database";
import User from "./models/User";
import app from "./app";

dotenv.config();

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("🟢 Database connected and models synchronized!");

    const port = process.env.PORT || 3333;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

startServer();
