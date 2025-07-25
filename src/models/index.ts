import sequelize from "../config/database";
import { Profile } from "./Profile";
import { Post } from "./Post";
import { Follow, initFollowModel } from "./Follow";

// Inicializa o model Follow
initFollowModel(sequelize);

// ===== TODAS AS ASSOCIAÇÕES AQUI =====

// Profile -> Post (1:N)
Profile.hasMany(Post, {
  foreignKey: "profileId",
  as: "posts",
});

Post.belongsTo(Profile, {
  foreignKey: "profileId",
  as: "profile",
});

// Profile -> Follow (seguidores e seguidos)
Follow.belongsTo(Profile, {
  foreignKey: "followerProfileId",
  as: "follower",
});

Follow.belongsTo(Profile, {
  foreignKey: "followingProfileId",
  as: "following",
});

Profile.hasMany(Follow, {
  foreignKey: "followingProfileId",
  as: "followers",
});

Profile.hasMany(Follow, {
  foreignKey: "followerProfileId",
  as: "following",
});

// ===== EXPORTAR TODOS OS MODELS =====
export { Profile, Post, Follow };
