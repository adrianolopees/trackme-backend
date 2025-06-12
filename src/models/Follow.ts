import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Follow extends Model {
  public follower_id!: number;
  public following_id!: number;
  public followed_at!: Date;
}

Follow.init(
  {
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    followed_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "Follows",
    timestamps: false,
  }
);

export default Follow;
