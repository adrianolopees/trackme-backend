import sequelize from "./config/database";
import { validateData } from "./utils/validateData";
import { registerSchema, RegisterData } from "./validators/profileValidator";
import { AuthService } from "./services/authService";

async function testProfileCreation() {
  try {
    await sequelize.authenticate();
    console.log("🟢 Conectado ao banco de dados!");

    // 👤 Dados simulados (válidos)
    const testProfile: RegisterData = {
      username: `teste_${Date.now()}`,
      email: `teste${Date.now()}@email.com`,
      password: "123456",
      name: "Usuário Teste",
      bio: "Bio do usuário de teste",
    };

    // ✅ Validar dados com Zod
    const validation = validateData(registerSchema, testProfile);
    if (!validation.success) {
      console.error("❌ Erro de validação:", validation.issues);
      return;
    }

    // ✅ Criar usuário no banco
    const profile = await AuthService.register(validation.data);
    console.log("✅ Perfil criado com sucesso!");
    console.log("🆔 ID:", profile.id);
    console.log("📧 Email:", profile.email);
    console.log("👤 Username:", profile.username);
  } catch (error) {
    console.error("❌ Erro ao testar criação de perfil:", error);
  } finally {
    await sequelize.close();
    console.log("🔒 Conexão com o banco encerrada.");
  }
}

testProfileCreation();
