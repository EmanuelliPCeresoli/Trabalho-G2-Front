// =====================================================================
// lista.js — READ (lista) + busca + DELETE
// =====================================================================

// 1) Pegamos os elementos da tela uma vez só
const formBusca = document.getElementById('form-busca');
const campoBusca = document.getElementById('campo-busca');
const elCarregando = document.getElementById('carregando');
const elErro = document.getElementById('erro');
const elVazio = document.getElementById('vazio');
const tabela = document.getElementById('tabela');
const corpoTabela = document.getElementById('corpo-tabela');

// 2) "Estado" da tela: no React era useState; aqui é uma variável comum
let produtos = [];

// 3) Desenha a tabela a partir do array produtos
//    (no React a tela se atualizava sozinha; aqui chamamos render() na mão)
function render() {
  corpoTabela.innerHTML = '';

  produtos.forEach((p) => {
    const tr = document.createElement('tr');

    // Criamos as células com textContent (e não innerHTML) para que um
    // nome como "<script>" apareça como texto e não vire HTML.
    const tdId = document.createElement('td');
    tdId.textContent = p.id;

    const tdNome = document.createElement('td');
    const link = document.createElement('a');
    link.href = `produto.html?id=${p.id}`;
    link.textContent = p.nome;
    tdNome.appendChild(link);

    const tdCategoria = document.createElement('td');
    tdCategoria.textContent = p.categoria || '—';

    const tdPreco = document.createElement('td');
    tdPreco.textContent = formatarPreco(p.preco);

    const tdEstoque = document.createElement('td');
    tdEstoque.textContent = p.estoque;

    const tdAcoes = document.createElement('td');
    tdAcoes.className = 'acoes';

    const btnEditar = document.createElement('a');
    btnEditar.href = `formulario.html?id=${p.id}`;
    btnEditar.className = 'botao secundario';
    btnEditar.textContent = 'Editar';

    const btnExcluir = document.createElement('button');
    btnExcluir.className = 'perigo';
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => handleExcluir(p.id, p.nome));

    tdAcoes.append(btnEditar, btnExcluir);
    tr.append(tdId, tdNome, tdCategoria, tdPreco, tdEstoque, tdAcoes);
    corpoTabela.appendChild(tr);
  });

  // Renderização condicional: tabela só aparece se tiver produto
  mostrar(tabela, produtos.length > 0);
  mostrar(elVazio, produtos.length === 0);
}

// 4) Busca os dados na API
async function carregar(termo = '') {
  try {
    mostrar(elCarregando, true);
    mostrar(elErro, false);
    mostrar(elVazio, false);
    mostrar(tabela, false);

    produtos = await listarProdutos(termo);
    render();
  } catch (e) {
    elErro.textContent = 'Não foi possível carregar os produtos. A API está rodando? (' + e.message + ')';
    mostrar(elErro, true);
  } finally {
    mostrar(elCarregando, false);
  }
}

// 5) DELETE
async function handleExcluir(id, nome) {
  if (!confirm(`Excluir "${nome}"?`)) return;
  try {
    await excluirProduto(id);
    // Atualiza o array sem buscar tudo da API de novo, e redesenha
    produtos = produtos.filter((p) => p.id !== id);
    render();
  } catch (e) {
    alert('Erro ao excluir: ' + e.message);
  }
}

// 6) Busca por nome
formBusca.addEventListener('submit', (e) => {
  e.preventDefault(); // impede o navegador de recarregar a página
  carregar(campoBusca.value);
});

// 7) Equivalente ao useEffect(..., []): roda uma vez quando a página abre
carregar();
