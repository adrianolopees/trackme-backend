import sharp from "sharp";

export const imageProcessor = {
  /**
   * Processa avatar do usuário
   * - Rotaciona automaticamente baseado nos metadados EXIF
   * - Redimensiona para 256x256 mantendo proporção
   * - Converte para JPEG com qualidade 80%
   */
  async processAvatar(buffer: Buffer): Promise<Buffer> {
    try {
      return await sharp(buffer)
        .rotate() // Auto-rotação baseada nos metadados EXIF
        .resize(256, 256, {
          fit: "cover", // Mantém proporção e corta se necessário
          position: "center",
        })
        .jpeg({
          quality: 80,
          progressive: true,
        })
        .toBuffer();
    } catch (error) {
      console.error("❌ Erro ao processar imagem:", error);
      throw new Error("Falha no processamento da imagem");
    }
  },

  async validateImage(buffer: Buffer): Promise<boolean> {
    try {
      const metadata = await sharp(buffer).metadata();
      return !!(metadata.width && metadata.height);
    } catch {
      return false;
    }
  },

  async getImageInfo(buffer: Buffer) {
    try {
      const metadata = await sharp(buffer).metadata();
      return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: buffer.length,
      };
    } catch (error) {
      throw new Error("Não foi possível obter informações da imagem");
    }
  },
};
export default imageProcessor;
