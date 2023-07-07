const URL = "http://localhost/Sobjucas";

//addItemCarrinho(1, 2);

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
        element.quantidade += quantidade;
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        return;
      }
    });
  }

  carrinho.push(item);

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function removeItemCarrinho(produto_id) {
  let carrinho = localStorage.getItem("carrinho");
  carrinho = carrinho ? JSON.parse(carrinho) : [];
  //console.log(carrinho);

  carrinho = carrinho.filter(item => item.produto_id !== produto_id);
  console.log(carrinho);

  alert("Produto removido do carrinho");

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  populateCarrinho();
}


function populateCarrinho() {

  let carrinho = localStorage.getItem("carrinho");
  carrinho = carrinho ? JSON.parse(carrinho) : [];

  carrinho.forEach(item => {
    addTableRow(item);
  });
}

function addTableRow(item) {
  quantidade = item.quantidade;
  fetch(`${URL}/back-end/api/product/getOne.php?id=${item.produto_id}`)
    .then(res => res.json())
    .then(product => {
      nome = product.nome;
      preco = product.preco;

      const table = document.getElementById("TABELA");

      // Criando uma linha para adicionar na tabela
      const tr = document.createElement("tr");

      const td1 = document.createElement("td");
      td1.innerHTML = nome;

      const td2 = document.createElement("td");
      td2.innerHTML = preco;

      const td3 = document.createElement("td");
      td3.innerHTML = quantidade;

      const td4 = document.createElement("td");


      const btRemove = document.createElement("button");
      btRemove.innerHTML = "Remover";
      btRemove.onclick = () => {
        removeItemCarrinho(id);
      };

      td4.appendChild(btRemove);


      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);

      table.tBodies[0].appendChild(tr);
    });

}

function validateAdmin() {
  let admin = localStorage.getItem("admin");
  console.log(admin);
  if (admin != 1) {
    link = document.getElementById("adm").href="home.html";
    //console.log(link);
    alert("Você não tem permissão para acessar essa página");
    window.location.assign("home.html");
  }
}

populateCarrinho();
