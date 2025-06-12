import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Definição dos atributos da Playlist
interface PlaylistAttributes {
  id: number;
  user_id: number;
  name: string;
  description: string;
  is_public: boolean;
  created_at?: Date;
}

// Definição para criação (id e created_at opcionais)
interface PlaylistCreationAttributes
  extends Optional<PlaylistAttributes, "id" | "created_at"> {}

class Playlist
  extends Model<PlaylistAttributes, PlaylistCreationAttributes>
  implements PlaylistAttributes
{
  public id!: number;
  public user_id!: number;
  public name!: string;
  public description!: string;
  public is_public!: boolean;
  public created_at!: Date;
}

Playlist.init(
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
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "Playlists",
    timestamps: false,
  }
);

export default Playlist;
