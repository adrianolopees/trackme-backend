import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database"; // seu arquivo de conexão

interface PostAttributes {
  id: number;
  user_id: number;
  title: string;
  content?: string | null;
  playlist_id?: number | null;
  created_at?: Date;
}

interface PostCreationAttributes
  extends Optional<
    PostAttributes,
    "id" | "content" | "playlist_id" | "created_at"
  > {}

class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  public id!: number;
  public user_id!: number;
  public title!: string;
  public content!: string | null;
  public playlist_id!: number | null;
  public readonly created_at!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    playlist_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "Posts",
    timestamps: false, // ou true, se quiser updatedAt etc
  }
);

export default Post;
// Exportando o modelo Post
// para ser usado em outros arquivos
