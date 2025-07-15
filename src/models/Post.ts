// src/models/Post.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface PostAttributes {
  id: number;
  img?: Buffer;
  caption: string;
  visibility: number;
  playlistId?: number;
  profileId: number;
}

interface PostCreationAttributes
  extends Optional<PostAttributes, "id" | "img" | "playlistId"> {}

class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  declare id: number;
  declare img?: Buffer;
  declare caption: string;
  declare visibility: number;
  declare playlistId?: number;
  declare profileId: number;

  // Associações serão definidas depois
  declare Profile?: any;
  declare Playlist?: any;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    img: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    caption: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    visibility: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    playlistId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "Post",
    timestamps: true,
  }
);

export { Post };
