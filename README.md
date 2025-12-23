# Fastify + Zod + TypeScript API

API REST com Fastify, Zod para validação e TypeScript.

## Estrutura do Projeto

```
src/
├── controllers/      # Controladores (recebem requisições)
├── services/         # Serviços (lógica de negócio)
├── routes/           # Rotas da aplicação
├── schemas/          # Schemas de validação (Zod)
└── server.ts         # Entry point
```

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Servidor vai rodar em `http://localhost:3000`

## Build

```bash
npm run build
```

## Produção

```bash
npm run start
```

## Endpoints

### Users

- `POST /users` - Criar usuário
- `GET /users` - Listar todos
- `GET /users/:id` - Obter um usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Exemplo de requisição

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"João","email":"joao@example.com","age":30}'
```
