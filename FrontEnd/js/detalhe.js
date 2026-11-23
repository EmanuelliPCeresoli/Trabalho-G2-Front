
const id = lerParametro('id');

const elCarregando = document.getElementById('carregando');
const secaoErro = document.getElementById('secao-erro');
const elErro = document.getElementById('erro');
const secaoDetalhe = document.getElementById('secao-detalhe');

let ponto = null;

// Mostra uma mensagem de erro
function mostrarErro(mensagem) {
  elErro.textContent = mensagem;
  mostrar(secaoErro, true);
}

// Preenche a página com os dados do ponto
function preencherTela() {
  document.title = `${ponto.name} · Pontos Geográficos`;

  document.getElementById('nome').textContent = ponto.name;

  document.getElementById('descricao').textContent =
    ponto.description || '—';

  document.getElementById('latitude').textContent = ponto.latitude;

  document.getElementById('longitude').textContent = ponto.longitude;

  document.getElementById('btn-editar').href =
    `formulario.html?id=${ponto.id}`;

  mostrar(secaoDetalhe, true);
}

// Busca o ponto na API
async function carregar() {
  if (!id) {
    mostrar(elCarregando, false);
    mostrarErro('Nenhum ponto informado na URL.');
    return;
  }

  try {
    ponto = await buscarPonto(id);
    preencherTela();
  } catch (e) {
    mostrarErro(e.message);
  } finally {
    mostrar(elCarregando, false);
  }
}

// Exclui o ponto selecionado
document.getElementById('btn-excluir').addEventListener('click', async () => {
  if (!confirm(`Excluir "${ponto.name}"?`)) return;

  try {
    await excluirPonto(id);
    window.location.href = 'index.html';
  } catch (e) {
    alert('Erro ao excluir: ' + e.message);
  }
});

carregar();
