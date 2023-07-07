const URL = "http://localhost/Sobjucas";

addItemCarrinho(1, 2);

function addItemCarrinho(produto_id, quantidade){
    let carrinho = localStorage.getItem("carrinho");
    carrinho = carrinho ? JSON.parse(carrinho) : [];

    console.log(carrinho);

    const item = {
        produto_id,
        quantidade
    }

    carrinho.push(item);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function removeItemCarrinho(produto_id){
    let carrinho = localStorage.getItem("carrinho");
    carrinho = carrinho ? JSON.parse(carrinho) : [];
    
    carrinho = carrinho.filter(item => item.produto_id !== produto_id);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function confirmarCompra(){

}

function populateCarrinho(){

    let carrinho = localStorage.getItem("carrinho");
  carrinho = carrinho ? JSON.parse(carrinho) : [];

  const carrinhoContainer = document.getElementById("carrinho-container");
  carrinhoContainer.innerHTML = "";

  carrinho.forEach(item => {
    
    const produto_id = item.produto_id;

    
    fetch(`${URL}/back-end/api/product/getOne.php?id=${produto_id}`)
      .then(res => res.json())
      .then(product => {
        
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        const nomeProduto = document.createElement("span");
        nomeProduto.textContent = "Nome do produto: " + product.nome;

        const quantidade = document.createElement("span");
        quantidade.textContent = "Quantidade: " + item.quantidade;

        const preco = document.createElement("span");
        preco.textContent = "Preço: " + product.preco;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.addEventListener("click", () => {
          removeItemCarrinho(produto_id);
        });

        // Adiciona os elementos ao container do carrinho
        itemDiv.appendChild(nomeProduto);
        itemDiv.appendChild(quantidade);
        itemDiv.appendChild(preco);
        itemDiv.appendChild(removeButton);
        carrinhoContainer.appendChild(itemDiv);
      });
  });  
}

    

  populateCarrinho();