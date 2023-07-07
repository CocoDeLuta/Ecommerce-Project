// URL base da API de dados da pessoa
const URL = "http://localhost/Sobjucas/back-end";

/**
 * Função getAll()
 * Objetivo: Fazer uma requisição HTTP para obter
 * uma lista de pessoas em JSON e, posteriormente,
 * atualizar a tabela HTML.
 */
function getAll() {
  // Cliente HTTP faz a requisição para a API
  fetch(`${URL}/api/user/get.php`)
    .then((res) => res.json()) // Convertemos JSON em OBJ
    .then((data) => {
      // Atualiza a tabela HTML
      console.log(data);

      data.forEach((pessoa) => {
        addTableRow(pessoa);
      });
    });
}

function validateAdmin() {
  let admin = localStorage.getItem("admin");
  console.log(admin);
  if (admin != 1) {
    link = document.getElementById("adm").href="home.html";
    console.log(link);
    alert("Você não tem permissão para acessar essa página");
    window.location.assign("home.html");
  }
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

  fetch(`${URL}/api/user/delete.php?id=${id}`)
    .then((res) => {
      console.log(res);
      if (res.status == 200) tr.remove();
      else alert("Falha ao remover pessoa " + id);
    })
    .catch((err) => {
      console.log(err);
    });
}

function isLogged() {
  let token = localStorage.getItem("token");
  console.log(token);
  if (token == null) {
    link = document.getElementById("carrinho").href = "home.html";
    console.log(link);
    alert("Você não está logado");
    window.location.assign("home.html");
  }
}

function logOut() {
  let a = localStorage.getItem('token');
  if (!a) {
    alert("Você não está logado");
    window.location.assign("home.html");
  }
  else {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    window.location.assign("home.html");
    alert("Você foi deslogado");
  }
}

// Invocando a função para obter a lista de pessoas
// e atualizar o tabela
getAll();
