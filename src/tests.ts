// test-post.ts
import sequelize from "./config/database";
import { Profile, Post } from "./models";

async function testPost() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão estabelecida!");

    // 1. Criar um perfil primeiro
    const profile = await Profile.create({
      username: "teste_user_" + Date.now(), // ✅ Único
      email: `teste${Date.now()}@email.com`, // ✅ Único
      password: "senha123",
      name: "Usuario Teste",
      bio: "Bio de teste",
    });

    console.log("✅ Perfil criado com ID:", profile.id);

    // 2. ✅ IMPORTANTE: Usar o ID do perfil criado
    const post = await Post.create({
      caption: "Meu primeiro post!",
      visibility: 1,
      profileId: profile.id, // ✅ Certifique-se que está passando o ID
    });

    console.log("✅ Post criado com ID:", post.id);
    console.log("✅ Post profileId:", post.profileId);

    // 3. Testar busca com relacionamento
    const postWithProfile = await Post.findByPk(post.id, {
      include: [
        {
          model: Profile,
          as: "profile",
        },
      ],
    });

    console.log("✅ Post encontrado:", postWithProfile?.caption);
    console.log("✅ Autor do post:", postWithProfile?.Profile?.name);
  } catch (error) {
    console.error("❌ Erro:", error);
  } finally {
    await sequelize.close();
  }
}

testPost();
