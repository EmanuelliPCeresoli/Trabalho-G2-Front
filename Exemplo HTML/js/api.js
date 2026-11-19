// =====================================================================
// api.js — toda conversa com o backend fica concentrada aqui.
// As páginas só chamam estas funções, sem saber detalhes de fetch/URL.
// (Mesma ideia do services/api.js do React, só que sem import/export:
//  as funções ficam disponíveis "globalmente" para os outros scripts.)
// =====================================================================
const API_URL = 'http://localhost:3001';

async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes
  });

  // fetch NÃO lança erro em 404/400/500 -> precisamos verificar resposta.ok
  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => ({}));
    const mensagem = corpo.erro || corpo.erros?.join(', ') || `Erro ${resposta.status}`;
    throw new Error(mensagem);
  }

  // DELETE devolve 204 (sem corpo)
  if (resposta.status === 204) return null;
  return resposta.json();
}

const listarProdutos = (busca = '') =>
  requisicao(`/produtos${busca ? `?busca=${encodeURIComponent(busca)}` : ''}`);

const buscarProduto = (id) => requisicao(`/produtos/${id}`);

const criarProduto = (produto) =>
  requisicao('/produtos', { method: 'POST', body: JSON.stringify(produto) });

const atualizarProduto = (id, produto) =>
  requisicao(`/produtos/${id}`, { method: 'PUT', body: JSON.stringify(produto) });

const excluirProduto = (id) =>
  requisicao(`/produtos/${id}`, { method: 'DELETE' });

// ---------- Utilitários usados pelas páginas ----------

const formatarPreco = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Lê um parâmetro da URL. Ex.: produto.html?id=3 -> lerParametro('id') === '3'
// (No React isso era o useParams(); aqui usamos a "query string".)
function lerParametro(nome) {
  return new URLSearchParams(window.location.search).get(nome);
}

// Mostra ou esconde um elemento (substitui a renderização condicional do JSX)
function mostrar(elemento, visivel) {
  elemento.classList.toggle('escondido', !visivel);
}
