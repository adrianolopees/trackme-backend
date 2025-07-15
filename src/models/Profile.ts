import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
export interface ProfileAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  bio?: string;
  avatar?: Buffer | null;
}

export interface ProfileCreationAttributes
  extends Optional<ProfileAttributes, "id" | "bio" | "avatar"> {}

class Profile
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  declare readonly id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare name: string;
  declare bio?: string;
  declare avatar?: Buffer;

  // Associações
  declare posts?: any[];
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    avatar: {
      type: DataTypes.BLOB,
      allowNull: true,
      get() {
        const raw = this.getDataValue("avatar");
        return raw ? raw.toString("base64") : null;
      },
    },
  },
  {
    sequelize,
    modelName: "Profile",
    tableName: "Profile",
    timestamps: true,
  }
);

export { Profile };
