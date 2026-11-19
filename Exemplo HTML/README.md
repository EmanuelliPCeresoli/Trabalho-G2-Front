# Aula 11 · CRUD de Produtos em HTML, CSS e JavaScript puro

Mesmo CRUD da versão React (`../frontend`), consumindo a **mesma API** (`../backend`, porta 3001),
mas sem React, sem Vite e sem `npm install` no front.

## Como rodar
1. Suba a API:
   ```
   cd backend
   npm install
   npm run dev
   ```
2. Abra `html/index.html` no navegador (duplo clique já funciona)
   ou use a extensão **Live Server** do VS Code.

## Páginas
| Arquivo                     | Equivale no React         | Ação            |
|-----------------------------|---------------------------|-----------------|
| `index.html`                | `/produtos`               | Listar + buscar + excluir |
| `formulario.html`           | `/produtos/novo`          | Criar (POST)    |
| `formulario.html?id=3`      | `/produtos/3/editar`      | Editar (PUT)    |
| `produto.html?id=3`         | `/produtos/3`             | Detalhe + excluir |

## Estrutura
```
html/
├── index.html / produto.html / formulario.html
├── css/style.css        ← mesmo CSS do React
└── js/
    ├── api.js           ← fetch para a API (igual ao services/api.js)
    ├── lista.js
    ├── detalhe.js
    └── formulario.js
```

## React x JS puro (o que muda)
| React                          | JavaScript puro                                   |
|--------------------------------|---------------------------------------------------|
| `useState`                     | variável comum (`let produtos = []`)              |
| re-render automático           | chamar `render()` depois de mudar os dados        |
| `useEffect(..., [])`           | chamar `carregar()` no final do script            |
| JSX `{cond && <p/>}`           | `mostrar(elemento, cond)` (classe `.escondido`)   |
| `useParams()`                  | `new URLSearchParams(location.search).get('id')`  |
| `navigate('/produtos')`        | `window.location.href = 'index.html'`             |
| `<Link>` / React Router        | `<a href>` entre páginas HTML                     |
| `onChange` + estado do form    | `new FormData(form)` na hora de enviar            |
| `import/export`                | `<script src>` em ordem (api.js primeiro)         |
