import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database"; // Ajuste esse caminho conforme sua estrutura

// Tipagem dos atributos
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
  profilePicture?: string | null;
  createdAt?: Date;
}

// Tipagem para criação (id e createdAt são automáticos)
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "createdAt" | "profilePicture"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public name!: string;
  public password!: string;
  public isAdmin!: boolean;
  public profilePicture!: string | null;
  public readonly createdAt!: Date;
}

// Inicializa o model no Sequelize
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false, // Se quiser `updatedAt`, coloque `true`
  }
);

export default User;
