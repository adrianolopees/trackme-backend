import dotenv from "dotenv";
import sequelize from "./config/database";
import app from "./app";

dotenv.config();

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("🟢 Banco conectado e modelos sincronizados!");

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server rodando na porta ${port}`));
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
};

startServer();
