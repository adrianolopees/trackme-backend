// models/Profile.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

import {
  ProfileAttributes,
  ProfileCreationAttributes,
} from "../interfaces/Profile";

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

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

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
    modelName: "Profile",
    tableName: "Profile",
    timestamps: true,
  }
);

export { Profile };
