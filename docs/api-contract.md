# API Contract

Base URL
- `http://<host>:3000`
- JSON UTF-8 responses
- Pagination via `page` (default 1) and `limit` (default 50, max 1000)

## Endpoints

### GET /units
- Query params:
  - `cidade` (string, optional; case-insensitive equality)
  - `uf` (string, optional; 2 letters; uppercase comparison)
  - `page` (number, optional; default 1)
  - `limit` (number, optional; default 50)
- Response 200:
```json
{
  "success": true,
  "data": [
    {
      "nome": "CLINICA ABC",
      "cidade": "Sao Paulo",
      "uf": "SP",
      "enderecoCompleto": "Rua X, 123 - Bairro",
      "especialidades": ["CARDIO", "PEDIATRIA"],
      "superior": true,
      "senior": false,
      "tipo": "HOSPITAL",
      "unimed": "UNIMED SP",
      "telefone": "11999999999"
    }
  ],
  "total": 1234,
  "page": 1,
  "limit": 50
}
```

### GET /units/search
- Purpose: buscar por nome do recurso (`NOME`/`NOME_2`) dentro de uma cidade/UF.
- Query params:
  - `nome` (string, **required**; substring, case-insensitive)
  - `cidade` (string, optional; case-insensitive equality)
  - `uf` (string, optional; 2 letters; uppercase comparison)
  - `page` (number, optional; default 1)
  - `limit` (number, optional; default 50)
- Response 200: igual ao `/units`, filtrando pelo `nome` informado.

### GET /csv
- Query params:
  - `cidade` (string, optional; case-insensitive equality)
  - `uf` (string, optional; 2 letters; uppercase comparison)
  - `page` (number, optional; default 1)
  - `limit` (number, optional; default 50)
- Response 200:
```json
{
  "success": true,
  "data": [
    {
      "TIPO": "HOSPITAL",
      "RECURSO": "CLINICA ABC",
      "CIDADE": "Sao Paulo",
      "UF": "SP",
      "TELEFONE": "11999999999",
      "ENDERECO_COMPLETO": "Rua X, 123 - Bairro",
      "BAIRRO": "Centro",
      "ESPECIALIDADE": "CARDIO",
      "SUPERIOR": true,
      "SENIOR": false
    }
  ],
  "total": 1234,
  "page": 1,
  "limit": 50
}
```
