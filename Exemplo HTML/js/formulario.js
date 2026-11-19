// =====================================================================
// formulario.js — CREATE e UPDATE na MESMA página.
//   formulario.html        -> modo criação (POST)
//   formulario.html?id=3   -> modo edição  (PUT)
// =====================================================================

const id = lerParametro('id');
const editando = Boolean(id);

const form = document.getElementById('form-produto');
const titulo = document.getElementById('titulo');
const elErro = document.getElementById('erro');
const elCarregando = document.getElementById('carregando');
const secaoForm = document.getElementById('secao-form');
const btnSalvar = document.getElementById('btn-salvar');
const textoBotao = editando ? 'Salvar alterações' : 'Cadastrar';

function mostrarErro(mensagem) {
  elErro.textContent = mensagem;
  mostrar(elErro, Boolean(mensagem));
}

// Preenche os campos usando o atributo "name" de cada input
// (no React era o estado "form" ligado ao value de cada input)
function preencherFormulario(produto) {
  for (const campo of ['nome', 'preco', 'estoque', 'categoria', 'descricao']) {
    form.elements[campo].value = produto[campo] ?? '';
  }
}

// Lê os campos do formulário e devolve um objeto pronto para a API
function lerFormulario() {
  const dados = Object.fromEntries(new FormData(form)); // { nome: '...', preco: '...', ... }
  return {
    ...dados,
    preco: Number(dados.preco),
    estoque: Number(dados.estoque)
  };
}

async function iniciar() {
  btnSalvar.textContent = textoBotao;

  if (!editando) {
    document.getElementById('link-novo').classList.add('active');
    mostrar(secaoForm, true);
    return;
  }

  titulo.textContent = `Editar produto #${id}`;
  document.title = `Editar produto #${id} · Aula 11`;
  mostrar(elCarregando, true);
  try {
    const produto = await buscarProduto(id);
    preencherFormulario(produto);
  } catch (e) {
    mostrarErro(e.message);
  } finally {
    mostrar(elCarregando, false);
    mostrar(secaoForm, true);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // impede o navegador de recarregar a página
  mostrarErro('');

  if (!form.elements.nome.value.trim()) {
    mostrarErro('Informe o nome do produto.');
    return;
  }

  const dados = lerFormulario();

  try {
    btnSalvar.disabled = true;
    btnSalvar.textContent = 'Salvando...';
    if (editando) {
      await atualizarProduto(id, dados);   // PUT
    } else {
      await criarProduto(dados);           // POST
    }
    window.location.href = 'index.html';   // volta para a lista
  } catch (e) {
    mostrarErro(e.message);
    btnSalvar.disabled = false;
    btnSalvar.textContent = textoBotao;
  }
});

iniciar();
