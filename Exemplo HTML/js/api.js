
const API_URL = 'http://localhost:8080';

async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes
  });

  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => ({}));
    const mensagem = corpo.erro || corpo.erros?.join(', ') || `Erro ${resposta.status}`;
    throw new Error(mensagem);
  }

  if (resposta.status === 204) return null;
  return resposta.json();
}

const listarPontos = () =>
  requisicao('/api/points');

const buscarPonto = (id) =>
  requisicao(`/api/points/${id}`);

const criarPonto = (ponto) =>
  requisicao('/api/points', {
    method: 'POST',
    body: JSON.stringify(ponto)
  });

const atualizarPonto = (id, ponto) =>
  requisicao(`/api/points/${id}`, {
    method: 'PUT',
    body: JSON.stringify(ponto)
  });

const excluirPonto = (id) =>
  requisicao(`/api/points/${id}`, {
    method: 'DELETE'
  });

function lerParametro(nome) {
  return new URLSearchParams(window.location.search).get(nome);
}

function mostrar(elemento, visivel) {
  elemento.classList.toggle('escondido', !visivel);
}
