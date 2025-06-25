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

// Para REGISTRO - password obrigatório
export interface ProfileRegistrationAttributes {
  username: string;
  email: string;
  password: string;
  name: string;
  bio?: string;
  avatar?: Buffer;
}

// Para LOGIN - apenas campos necessários
export interface ProfileLoginAttributes {
  identifier: string;
  password: string;
}

// Para ATUALIZAÇÃO DE PERFIL - sem email e password
export interface ProfileUpdateAttributes {
  bio?: string;
  avatar?: Buffer;
}

// Para RESPOSTA PÚBLICA - sem password
export interface ProfilePublicAttributes {
  id: number;
  username: string;
  email: string;
  name: string;
  bio?: string;
  avatar?: Buffer;
  createdAt: Date;
  updatedAt: Date;
}
