// =====================================================================
// detalhe.js — READ (um produto) + DELETE
// URL esperada: produto.html?id=3
// =====================================================================

const id = lerParametro('id'); // no React: const { id } = useParams();

const elCarregando = document.getElementById('carregando');
const secaoErro = document.getElementById('secao-erro');
const elErro = document.getElementById('erro');
const secaoDetalhe = document.getElementById('secao-detalhe');

let produto = null;

function mostrarErro(mensagem) {
  elErro.textContent = mensagem;
  mostrar(secaoErro, true);
}

function preencherTela() {
  document.title = `${produto.nome} · Aula 11`;
  document.getElementById('nome').textContent = produto.nome;
  document.getElementById('preco').textContent = formatarPreco(produto.preco);
  document.getElementById('estoque').textContent = `${produto.estoque} un.`;
  document.getElementById('categoria').textContent = produto.categoria || '—';
  document.getElementById('descricao').textContent = produto.descricao || '—';
  document.getElementById('btn-editar').href = `formulario.html?id=${produto.id}`;
  mostrar(secaoDetalhe, true);
}

async function carregar() {
  if (!id) {
    mostrar(elCarregando, false);
    mostrarErro('Nenhum produto informado na URL.');
    return;
  }
  try {
    produto = await buscarProduto(id);
    preencherTela();
  } catch (e) {
    mostrarErro(e.message);
  } finally {
    mostrar(elCarregando, false);
  }
}

document.getElementById('btn-excluir').addEventListener('click', async () => {
  if (!confirm(`Excluir "${produto.nome}"?`)) return;
  try {
    await excluirProduto(id);
    window.location.href = 'index.html'; // no React: navigate('/produtos')
  } catch (e) {
    alert('Erro ao excluir: ' + e.message);
  }
});

carregar();
