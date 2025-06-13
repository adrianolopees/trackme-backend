import dotenv from "dotenv";
import sequelize from "./config/database";
import app from "./app";

dotenv.config();

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("🟢 Database connected and models synchronized!");

    const port = process.env.PORT || 3333;

    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  } catch (error) {
    console.error("❌ Database error:", error);
    process.exit(1);
  }
};

startServer();
