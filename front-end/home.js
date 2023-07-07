//script para validar se o usuario esta logado, se nao estiver ele nao pode acessar o carrinho

const URL = "http://localhost/Sobjucas";

function getAllCat() {
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

function validateAdmin() {
  let admin = localStorage.getItem("admin");
  console.log(admin);
  if (admin != 1) {
    link = document.getElementById("adm").href = "home.html";
    //console.log(link);
    alert("Você não tem permissão para acessar essa página");
    window.location.assign("home.html");
  }
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
  $cat = product.id_categoria;

  console.log($cat);
  fetch(`${URL}/back-end/api/category/getOne.php?id=${$cat}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      td4.innerHTML = data.nome;
    })
    .catch(err => console.log(err));



  const td5 = document.createElement("td");
  td5.innerHTML = product.preco;

  const td6 = document.createElement("td");
  td6.innerHTML = product.quantidade;

  const td7 = document.createElement("td");


  const btAdd = document.createElement("button");
  btAdd.innerHTML = "Adicionar";
  btAdd.onclick = () => {
    $quantidade_compra = prompt("Quantidade a ser comprada: ");
    if ($quantidade_compra > product.quantidade) {
      alert("Quantidade insuficiente em estoque");
      return;
    }
    addItemCarrinho(product.id, $quantidade_compra);
  };

  td7.appendChild(btAdd);


  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);
  tr.appendChild(td7);

  table.tBodies[0].appendChild(tr);
}

function addItemCarrinho(produto_id, quantidade) {
  let carrinho = localStorage.getItem("carrinho");
  carrinho = carrinho ? JSON.parse(carrinho) : [];

  console.log(carrinho);

  const item = {
    produto_id,
    quantidade
  }

  if (carrinho.length > 0) {
    carrinho.forEach(element => {
      if (element.produto_id == produto_id) {
        console.log(element.produto_id);
        element.quantidade = parseInt(element.quantidade) + parseInt(quantidade);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        return;
      }
      carrinho.push(item);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      return;
    });
  }
  else {
    carrinho.push(item);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    return;
  }
}

getAllCat();
//isLogged();