
const URL = "http://localhost/Sobjucas";

function getAll() {
  // Cliente HTTP faz a requisição para a API
  fetch(`${URL}/back-end/api/product/get.php`)
    .then((res) => res.json()) // Convertemos JSON em OBJ
    .then((data) => {
      // Atualiza a tabela HTML
      console.log(data);

      data.forEach((product) => {
        addTableRow(product);
      });
    });
}

/**
 * Função: addTableRow()]
 *
 * Objetivo: adicionar uma linha na tabela HTML.
 */
function addTableRow(product) {
  //console.log(product.id_categoria);

  const table = document.getElementById("tbproduto");

  // Criando uma linha para adicionar na tabela
  const tr = document.createElement("tr");

  const td1 = document.createElement("td");
  td1.innerHTML = product.id;

  const td2 = document.createElement("td");
  td2.innerHTML = product.nome;

  const td3 = document.createElement("td");
  td3.innerHTML = product.descricao;

  const td4 = document.createElement("td");
  td4.innerHTML = product.id_categoria;

  const td5 = document.createElement("td");
  td5.innerHTML = product.preco;

  const td6 = document.createElement("td");
  td6.innerHTML = product.quantidade;

  const td7 = document.createElement("td");

  const btRemove = document.createElement("button");
  btRemove.innerHTML = "Excluir";
  btRemove.onclick = () => {

    deleter(tr, product.id);
    2;
  };

  td7.appendChild(btRemove);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  tr.appendChild(td7);

  table.tBodies[0].appendChild(tr);
}


function deleter(tr, id) {
  console.log("Deletando o ID", id);

  fetch(`${URL}/back-end/api/product/delete.php?id=${id}`)
    .then((res) => {
      console.log(res);
      if (res.status == 200) tr.remove();
      else alert("Falha ao remover produto " + id);
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
  const fDescricao = document.getElementById("fDescricao");
  const fIdCategoria = document.getElementById("fIdCategoria");
  const fPreco = document.getElementById("fPreco");
  const fQuantidade = document.getElementById("fQuantidade");

  if (fNome.value == "" || fDescricao.value == ""
    || fIdCategoria.value == "" || fPreco.value == ""
    || fQuantidade.value == "") {
    alert("Preencha todos os campos!");
    return;
  }
  const product = {
    nome: fNome.value,
    descricao: fDescricao.value,
    id_categoria: fIdCategoria.value,
    preco: fPreco.value,
    quantidade: fQuantidade.value
  };


  // Invocar a API
  fetch(`${URL}/back-end/api/product/create.php`, {
    body: JSON.stringify(product),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => {
    if (res.status == 200 || res.status == 201) {
      alert("Salvo com sucesso!");

      res.json().then(pes => { addTableRow(pes) });
    } else alert("Falha ao salvar");
  });
}

// Invocando a função para obter a lista de pessoas
// e atualizar o tabela
getAll();