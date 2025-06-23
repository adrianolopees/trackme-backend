// src/models/index.ts
import { Profile } from "./Profile";
import { Post } from "./Post";
// import { Playlist } from './Playlist'; // quando criar

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

// Post -> Playlist (N:1) - quando criar o model Playlist
// Post.belongsTo(Playlist, {
//   foreignKey: 'playlistId',
//   as: 'playlist',
// });

// Playlist.hasMany(Post, {
//   foreignKey: 'playlistId',
//   as: 'posts',
// });

// ===== EXPORTAR TODOS OS MODELS =====
export {
  Profile,
  Post,
  // Playlist, // quando criar
};
