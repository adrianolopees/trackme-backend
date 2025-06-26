import { Optional } from "sequelize";

export interface ProfileAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  bio?: string;
  avatar?: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileCreationAttributes
  extends Optional<
    ProfileAttributes,
    "id" | "bio" | "avatar" | "createdAt" | "updatedAt"
  > {}
