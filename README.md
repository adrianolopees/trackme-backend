# TrackMe - Backend

Este é o backend da aplicação **TrackMe**, desenvolvido com **Node.js**, **Express**, **TypeScript**, **Sequelize** e **PostgreSQL**.

O sistema possui autenticação JWT, cadastro de usuário com validação e criptografia de senha, e está preparado para expansão com novas funcionalidades como postagens, playlists, etc.

---

## 🧵 Tecnologias Utilizadas

* Node.js
* Express.js
* TypeScript
* Sequelize ORM
* PostgreSQL
* JWT (Autenticação)
* Bcrypt (Hash de senhas)
* Zod (Validação de dados)
* Railway (hospedagem do banco de dados)

---

## 📁 Estrutura de Pastas

```
src/
├── config/
│   └── database.ts
├── controllers/
│   └── authController.ts
├── middlewares/
│   └── authMiddleware.ts
├── models/
│   └── User.ts
├── routes/
│   └── authRoutes.ts
├── validators/
│   └── userValidator.ts
├── app.ts
└── server.ts
```

---

## 📀 Banco de Dados

O projeto utiliza **PostgreSQL**, com configuração feita via `DATABASE_URL`. As models são sincronizadas automaticamente ao iniciar o servidor com `sequelize.sync()`. Para um ambiente de produção ou colaboração, recomenda-se o uso de **migrations** ou **scripts SQL**.

### ✅ Requisitos

* PostgreSQL instalado localmente ou uma instância no Railway (como usado neste projeto)

### 🔧 Configuração do .env

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=3000
JWT_SECRET=sua_chave_secreta
DATABASE_URL=postgresql://usuario:senha@host:porta/nome_do_banco
```

> Substitua os dados reais do `DATABASE_URL` conforme seu banco (por exemplo, o URL do Railway).

### 📌 Criar Tabela Manualmente (Alternativa ao Sync)

Se preferir não usar `.sync()`, você pode criar a tabela `Users` manualmente com o seguinte SQL:

```sql
CREATE TABLE "Users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) NOT NULL UNIQUE,
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "name" VARCHAR(255),
  "password" VARCHAR(255) NOT NULL,
  "profilePicture" TEXT,
  "isAdmin" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📝 Como Usar

### 1. Instale as dependências:

```bash
npm install
```

### 2. Rode o servidor (modo desenvolvimento):

```bash
npm run dev
```

> O servidor será iniciado na porta definida no `.env` (padrão: 3000)

---

## 🔑 Autenticação

### POST `/api/auth/register`

Cadastro de novo usuário:

```json
{
  "username": "usuario123",
  "email": "teste@email.com",
  "name": "Nome Completo",
  "password": "senha123",
  "profilePicture": "https://link-da-imagem.com/avatar.png"
}
```

### POST `/api/auth/login`

Login com email ou username:

```json
{
  "identifier": "teste@email.com",
  "password": "senha123"
}
```

Resposta:

```json
{
  "message": "Login bem-sucedido!",
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "Nome Completo",
    "email": "teste@email.com",
    "username": "usuario123"
  }
}
```

> O token JWT pode ser usado para acessar rotas protegidas enviando no header: `Authorization: Bearer SEU_TOKEN`

---

## 🚀 Deploy

Este backend pode ser hospedado em qualquer ambiente Node.js. O banco de dados foi hospedado no [Railway](https://railway.app).

---

## 👥 Autor

Desenvolvido por **Adriano Dev**

* GitHub: [@adrianolopees](https://github.com/adrianolopees)
* Projeto TrackMe - Em desenvolvimento!

---

> Este projeto é parte de um sistema completo que incluirá postagens, amizades e compartilhamento de playlists. Contribuições e feedbacks são bem-vindos!
