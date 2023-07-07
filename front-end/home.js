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
  
    const btRemove = document.createElement("button");
    btRemove.innerHTML = "Adicionar";
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

getAllCat();