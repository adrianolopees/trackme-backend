// test-login.ts
import sequelize from "./config/database";
import { validateData } from "./utils/validateData";
import { loginSchema, LoginData } from "./validators/profileValidator";
import { AuthService } from "./services/authService";

async function testLogin() {
  try {
    await sequelize.authenticate();
    console.log("🟢 Conectado ao banco de dados!");

    // 1. Dados válidos de login (use os mesmos do perfil criado antes!)
    const loginInput = {
      identifier: "teste1751047892403@email.com", // ✅ email ou username que já existe no banco
      password: "123456", // ✅ senha correta do perfil
    };

    // 2. Validação com Zod
    const validation = validateData(loginSchema, loginInput);
    if (!validation.success) {
      console.error("❌ Erros de validação:", validation.issues);
      return;
    }

    const loginData: LoginData = validation.data;

    // 3. Teste de login real
    const result = await AuthService.login(loginData);
    console.log("✅ Login bem-sucedido!");
    console.log("📄 Resultado:", result);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("❌ Falha no login:", msg);
  } finally {
    await sequelize.close();
    console.log("🔒 Conexão com o banco encerrada.");
  }
}

testLogin();
