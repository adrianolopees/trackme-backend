import {
  DataTypes,
  Model,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import { Profile } from "./Profile";

export class Follow extends Model<
  InferAttributes<Follow>,
  InferCreationAttributes<Follow>
> {
  declare followerProfileId: ForeignKey<Profile["id"]>;
  declare followingProfileId: ForeignKey<Profile["id"]>;
  declare followedAt: CreationOptional<Date>;

  // Associações
  declare static associate: (models: { Profile: typeof Profile }) => void;
}

export const initFollowModel = (sequelize: Sequelize) => {
  Follow.init(
    {
      followerProfileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Profile",
          key: "id",
        },
      },
      followingProfileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Profile",
          key: "id",
        },
      },
      followedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "Follows",
      timestamps: true,
      indexes: [
        {
          fields: ["followerProfileId"],
        },
        {
          fields: ["followingProfileId"],
        },
      ],
    }
  );

  // Associações
  Follow.associate = (models) => {
    Follow.belongsTo(models.Profile, {
      foreignKey: "followerProfileId",
      as: "follower",
    });

    Follow.belongsTo(models.Profile, {
      foreignKey: "followingProfileId",
      as: "following",
    });
  };

  return Follow;
};
