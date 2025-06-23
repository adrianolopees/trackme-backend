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
  createdAt: Date;
  updatedAt: Date;
}

interface PostCreationAttributes
  extends Optional<
    PostAttributes,
    "id" | "img" | "playlistId" | "createdAt" | "updatedAt"
  > {}

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
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
