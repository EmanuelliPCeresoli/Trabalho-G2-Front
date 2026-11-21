# Trabalho G2 — CRUD de Pontos Geográficos

## Sobre o projeto

Este projeto foi desenvolvido para a disciplina de Front-End da Atitus Educação.

O objetivo é criar uma interface web para o gerenciamento de pontos geográficos, utilizando HTML, CSS e JavaScript puro, com integração à API GeoPoint.

Cada ponto geográfico possui nome, descrição, latitude e longitude.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- Java e Spring Boot (API GeoPoint)
- PostgreSQL (banco de dados da API)

## Funcionalidades

**Implementadas e testadas:**
- Listagem de pontos geográficos cadastrados.
- Pesquisa de pontos pelo nome.
- Cadastro de novos pontos.
- Visualização dos detalhes de um ponto.
- Validação dos campos obrigatórios e dos limites máximos de latitude e longitude.
- Interface responsiva para computadores e celulares.

**Aguardando implementação dos métodos na API:**
- Edição de pontos geográficos (PUT).
- Exclusão de pontos geográficos (DELETE).

## Páginas

| Arquivo | Funcionalidade |
|---|---|
| `index.html` | Listagem e pesquisa de pontos |
| `formulario.html` | Cadastro e formulário de edição |
| `ponto.html` | Visualização dos detalhes de um ponto |

## Estrutura do Front-End

```text
css/
  style.css

js/
  api.js
  lista.js
  formulario.js
  detalhe.js

index.html
formulario.html
ponto.html
README.md
```

## Como executar

1. Inicie a API GeoPoint no IntelliJ IDEA.
2. Verifique se a API está funcionando em `http://localhost:8080/api/points`.
3. Abra o projeto Front-End no Visual Studio Code.
4. Utilize a extensão Live Server para abrir o arquivo `index.html` no navegador.

A API deve estar em execução para que o Front-End consiga consultar e cadastrar os pontos geográficos.

## Integração com a API

O Front-End utiliza `fetch` e `async/await` para realizar requisições HTTP.

Endereço utilizado:

`http://localhost:8080/api/points`

Métodos já disponíveis e testados:

- `GET /api/points` — listar pontos.
- `GET /api/points/{id}` — consultar um ponto específico.
- `POST /api/points` — cadastrar um novo ponto.

Métodos pendentes:

- `PUT /api/points/{id}` — atualizar um ponto.
- `DELETE /api/points/{id}` — excluir um ponto.

## Situação do projeto

O Front-End está integrado à API GeoPoint para listagem, consulta e cadastro de pontos geográficos.

As funcionalidades de edição e exclusão serão testadas após a implementação dos respectivos métodos no backend.