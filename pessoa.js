// URL base da API de dados da pessoa
const URL = "http://localhost/Sobjucas";

/**
 * Função getAll()
 * Objetivo: Fazer uma requisição HTTP para obter
 * uma lista de pessoas em JSON e, posteriormente,
 * atualizar a tabela HTML.
 */
function getAll() {
  // Cliente HTTP faz a requisição para a API
  fetch(`${URL}/api/get_user.php`)
    .then((res) => res.json()) // Convertemos JSON em OBJ
    .then((data) => {
      // Atualiza a tabela HTML
      console.log(data);

      data.forEach((pessoa) => {
        addTableRow(pessoa);
      });
    });
}

/**
 * Função: addTableRow()]
 *
 * Objetivo: adicionar uma linha na tabela HTML.
 */
function addTableRow(pessoa) {
  const table = document.getElementById("tbpessoa");

  // Criando uma linha para adicionar na tabela
  const tr = document.createElement("tr");

  // Primeira célula da linha (tr)
  const td1 = document.createElement("td");
  td1.innerHTML = pessoa.id;

  // Segunda célula da linha (tr)
  const td2 = document.createElement("td");
  td2.innerHTML = pessoa.nome;

  // Terceira célula da linha (tr)
  const td3 = document.createElement("td");
  td3.innerHTML = pessoa.email;

  // Quarta célula da linha (tr)
  const td4 = document.createElement("td");
  td4.innerHTML = pessoa.nascimento;

  // Quinta célula da linha (tr)
  const td5 = document.createElement("td");

  const btRemove = document.createElement("button");
  btRemove.innerHTML = "Excluir";
  btRemove.onclick = () => {
    //alert("Remover " + pessoa.nome);
    deletePessoa(tr, pessoa.id);
    2;
  };

  td5.appendChild(btRemove);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);

  table.tBodies[0].appendChild(tr);
}

/**
 * Objetivo: Deletar uma pessoa na API e remover a linha da tabela.
 */
function deletePessoa(tr, id) {
  console.log("Deletando o ID", id);

  fetch(`${URL}/api/delete_user.php?id=${id}`)
    .then((res) => {
      console.log(res);
      if (res.status == 200) tr.remove();
      else alert("Falha ao remover pessoa " + id);
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Função: save
 * Objetivo: Invocar a API, passando os dados do
 * formulário (nome, email, nascimento, ...)
 */
function save() {
  // Obter a referência para os campos input
  const fNome = document.getElementById("fNome");
  const fEmail = document.getElementById("fEmail");
  const fNascimento = document.getElementById("fNascimento");

  // Criar o objeto representando uma pessoa, contendo
  // os valores dos inputs
  const pessoa = {
    nome: fNome.value,
    email: fEmail.value,
    nascimento: fNascimento.value,
    senha: '1234'
  };

  console.log(pessoa);

  // Invocar a API
  fetch(`${URL}/api/create_user.php`, {
    body: JSON.stringify(pessoa),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => {
    if (res.status == 200 || res.status == 201) {
      alert("Salvo com sucesso!");

      res.json().then( pes => {addTableRow(pes)});
    } else alert("Falha ao salvar");
  });
}

// Invocando a função para obter a lista de pessoas
// e atualizar o tabela
getAll();
