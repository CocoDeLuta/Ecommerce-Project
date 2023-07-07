function getAllCateg() {
  // Cliente HTTP faz a requisição para a API
  fetch(`${URL}/back-end/api/category/get.php`)
    .then((res) => res.json()) // Convertemos JSON em OBJ
    .then((data) => {
      // Atualiza a tabela HTML
      console.log(data);

      data.forEach((category) => {
        addTableRowCateg(category);
      });
    });
}

/**
 * Função: addTableRow()]
 *
 * Objetivo: adicionar uma linha na tabela HTML.
 */
function addTableRowCateg(category) {
  console.log(category.id_categoria);

  const table = document.getElementById("tb_categoria");

  // Criando uma linha para adicionar na tabela
  const tr = document.createElement("tr");

  const td1 = document.createElement("td");
  td1.innerHTML = category.id;

  const td2 = document.createElement("td");
  td2.innerHTML = category.nome;

  const td3 = document.createElement("td");
  td3.innerHTML = category.descricao;

  const td4 = document.createElement("td");

  const btRemove = document.createElement("button");
  btRemove.innerHTML = "Excluir";
  btRemove.onclick = () => {

    deleterCateg(tr, category.id);
    2;
  };

  td4.appendChild(btRemove);

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  table.tBodies[0].appendChild(tr);
}


function deleterCateg(tr, id) {
  console.log("Deletando o ID", id);

  fetch(`${URL}/back-end/api/category/delete.php?id=${id}`)
    .then((res) => {
      console.log(res);
      if (res.status == 200) tr.remove();
      else alert("Falha ao remover categoria " + id);
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
function saveCateg() {
  // Obter a referência para os campos input
  const fNome = document.getElementById("fNomeCateg");
  const fDescricao = document.getElementById("fDescricaoCateg");

  if (fNome.value == "" || fDescricao.value == "") {
    alert("Preencha todos os campos!");
    return;
  }

  const category = {
    nome: fNome.value,
    descricao: fDescricao.value,
  };

  


  // Invocar a API
  fetch(`${URL}/back-end/api/category/create.php`, {
    body: JSON.stringify(category),
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => {
    if (res.status == 200 || res.status == 201) {
      alert("Salvo com sucesso!");
      res.json().then(pes => { addTableRowCateg(pes) });

    } else alert("Falha ao salvar");
  });

}

// Invocando a função para obter a lista de pessoas
// e atualizar o tabela
getAllCateg();