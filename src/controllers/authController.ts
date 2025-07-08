import { AuthService } from "../services/authService";
import { RegisterData, LoginData } from "../validators/profileValidator";
import { AuthResponse } from "../types/profile";

export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Registra um novo usuário
   * @param registerData - Dados de registro validados
   * @returns Promise<SafeProfile> - Perfil do usuário registrado sem senha
   */
  async register(registerData: RegisterData): Promise<AuthResponse> {
    const profile = await this.authService.register(registerData);
    return profile;
  }

  /**
   * Realiza o login de um usuário
   * @param loginData - Dados de login validados
   * @returns Promise<AuthResponse> - Resposta de autenticação com token e perfil
   */
  async login(loginData: LoginData): Promise<AuthResponse> {
    const result = await this.authService.login(loginData);
    return result;
  }
}
// Exporta uma instância do AuthController com o AuthService injetado
// Isso permite que o AuthController seja usado em outras partes da aplicação, como rotas.
export const authController = new AuthController(new AuthService());
