
const formBusca = document.getElementById('form-busca');
const campoBusca = document.getElementById('campo-busca');
const elCarregando = document.getElementById('carregando');
const elErro = document.getElementById('erro');
const elVazio = document.getElementById('vazio');
const tabela = document.getElementById('tabela');
const corpoTabela = document.getElementById('corpo-tabela');

let pontos = [];
let pontosFiltrados = [];

// Mostra os pontos na tabela
function render() {
  corpoTabela.innerHTML = '';

  pontosFiltrados.forEach((p) => {
    const tr = document.createElement('tr');

    const tdNome = document.createElement('td');
    const link = document.createElement('a');
    link.href = `ponto.html?id=${p.id}`;
    link.textContent = p.name;
    tdNome.appendChild(link);

    const tdDescricao = document.createElement('td');
    tdDescricao.textContent = p.description || '—';

    const tdLatitude = document.createElement('td');
    tdLatitude.textContent = p.latitude;

    const tdLongitude = document.createElement('td');
    tdLongitude.textContent = p.longitude;

    const tdAcoes = document.createElement('td');
    tdAcoes.className = 'acoes';

    const btnVer = document.createElement('a');
    btnVer.href = `ponto.html?id=${p.id}`;
    btnVer.className = 'botao secundario';
    btnVer.textContent = 'Ver';

    const btnEditar = document.createElement('a');
    btnEditar.href = `formulario.html?id=${p.id}`;
    btnEditar.className = 'botao secundario';
    btnEditar.textContent = 'Editar';

    const btnExcluir = document.createElement('button');
    btnExcluir.className = 'perigo';
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', () => handleExcluir(p.id, p.name));

    tdAcoes.append(btnVer, btnEditar, btnExcluir);
    tr.append(tdNome, tdDescricao, tdLatitude, tdLongitude, tdAcoes);
    corpoTabela.appendChild(tr);
  });

  mostrar(tabela, pontosFiltrados.length > 0);
  mostrar(elVazio, pontosFiltrados.length === 0);
}

// Filtra os pontos pelo nome
function filtrarPontos() {
  const termo = campoBusca.value.toLowerCase();

  pontosFiltrados = pontos.filter((p) =>
    p.name.toLowerCase().includes(termo)
  );

  render();
}

// Busca os pontos na API
async function carregar() {
  try {
    mostrar(elCarregando, true);
    mostrar(elErro, false);
    mostrar(elVazio, false);
    mostrar(tabela, false);

    pontos = await listarPontos();
    filtrarPontos();
  } catch (e) {
    elErro.textContent = 'Não foi possível carregar os pontos. (' + e.message + ')';
    mostrar(elErro, true);
  } finally {
    mostrar(elCarregando, false);
  }
}

// Exclui um ponto
async function handleExcluir(id, nome) {
  if (!confirm(`Excluir "${nome}"?`)) return;

  try {
    await excluirPonto(id);

    pontos = pontos.filter((p) => p.id !== id);
    filtrarPontos();
  } catch (e) {
    alert('Erro ao excluir: ' + e.message);
  }
}

// Pesquisa pelo nome
formBusca.addEventListener('submit', (e) => {
  e.preventDefault();
  filtrarPontos();
});

// Carrega os pontos quando a página abre
carregar();
