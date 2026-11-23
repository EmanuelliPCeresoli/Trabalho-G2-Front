
const id = lerParametro('id');
const editando = Boolean(id);

const form = document.getElementById('form-ponto');
const titulo = document.getElementById('titulo');
const elErro = document.getElementById('erro');
const elCarregando = document.getElementById('carregando');
const secaoForm = document.getElementById('secao-form');
const btnSalvar = document.getElementById('btn-salvar');
const textoBotao = editando ? 'Salvar alterações' : 'Cadastrar';

// Mostra mensagens de erro
function mostrarErro(mensagem) {
  elErro.textContent = mensagem;
  mostrar(elErro, Boolean(mensagem));
}

// Preenche os campos quando estamos editando
function preencherFormulario(ponto) {
  for (const campo of ['name', 'description', 'latitude', 'longitude']) {
    form.elements[campo].value = ponto[campo] ?? '';
  }
}

// Lê os dados preenchidos no formulário
function lerFormulario() {
  const dados = Object.fromEntries(new FormData(form));

  return {
    name: dados.name.trim(),
    description: dados.description,
    latitude: Number(dados.latitude),
    longitude: Number(dados.longitude)
  };
}

// Inicia o formulário
async function iniciar() {
  btnSalvar.textContent = textoBotao;

  if (!editando) {
    document.getElementById('link-novo').classList.add('active');
    mostrar(secaoForm, true);
    return;
  }

  titulo.textContent = 'Editar ponto geográfico';
  document.title = 'Editar ponto geográfico';
  mostrar(elCarregando, true);

  try {
    const ponto = await buscarPonto(id);
    preencherFormulario(ponto);
  } catch (e) {
    mostrarErro(e.message);
  }finally {
  mostrar(elCarregando, false);
  mostrar(secaoForm, true);
}
}

// Cadastrar ou editar um ponto
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  mostrarErro('');

  if (!form.elements.name.value.trim()) {
    mostrarErro('Informe o nome do ponto.');
    return;
  }

  const dados = lerFormulario();

  if (dados.name.length > 100) {
    mostrarErro('O nome deve ter no máximo 100 caracteres.');
    return;
  }

  if (dados.description.length > 255) {
    mostrarErro('A descrição deve ter no máximo 255 caracteres.');
    return;
  }

  if (form.elements.latitude.value.trim() === '' ||
      dados.latitude < -90 || dados.latitude > 90) {
    mostrarErro('A latitude deve estar entre -90 e 90.');
    return;
  }

  if (form.elements.longitude.value.trim() === '' ||
      dados.longitude < -180 || dados.longitude > 180) {
    mostrarErro('A longitude deve estar entre -180 e 180.');
    return;
  }

  try {
    btnSalvar.disabled = true;
    btnSalvar.textContent = 'Salvando...';

    if (editando) {
      await atualizarPonto(id, dados);
    } else {
      await criarPonto(dados);
    }

    window.location.href = 'index.html';
  } catch (e) {
    mostrarErro(e.message);
    btnSalvar.disabled = false;
    btnSalvar.textContent = textoBotao;
  }
});

iniciar();
