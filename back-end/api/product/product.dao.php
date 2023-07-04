<?php

class productDAO{
    private $pdo;
    public function __construct($pdo){
        $this->pdo = $pdo;
    }

    //inserir um usuario no banco de dados
    public function insert($product){
    
        $stmt = $this->pdo->prepare("INSERT INTO tb_produto
            (nome, descricao, id_categoria, preco, quantidade)
            VALUES (:nome, :descricao, :id_categoria, :preco, :quantidade);");

        //substituir os valores do SQL
        $stmt->bindValue("nome", $product->nome);
        $stmt->bindValue("descricao", $product->descricao);
        $stmt->bindValue("id_categoria", $product->id_categoria);
        $stmt->bindValue("preco", $product->preco);
        $stmt->bindValue("quantidade", $product->quantidade);

        $stmt->execute();   
        $product->id = $this->pdo->lastInsertId();
        $product = clone $product;
        return $product;
    }

    //obter todos os usuarios da tabela
    public function getAll(){
        $stmt = $this->pdo->prepare("SELECT * FROM tb_produto");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    //deletar um usuario do banco de dados
    public function delete($id){
        $stmt = $this->pdo->prepare("DELETE FROM tb_produto
        WHERE id=:id");

        $stmt->bindValue("id", $id);

        $stmt->execute();

        //retorna a quantidade de linhas afetadas
        return $stmt->rowCount();
    }

    //atualizar um usuario no banco de dados
    public function update($id, $product){
        $stmt = $this->pdo->prepare("UPDATE tb_produto SET
                nome = :nome, descricao = :descricao, id_categoria = :id_categoria,
                preco = :preco, quantidade = :quantidade
            WHERE id = :id");

        $data = [
            "id" => $id,
            "nome" => $product->nome,
            "descricao" => $product->descricao,
            "id_categoria" => $product->id_categoria,
            "preco" => $product->preco,
            "quantidade" => $product->quantidade
        ];

        $stmt->execute($data);

        //retorna a qtd de linhas afetadas
        return $stmt->rowCount();
    }
}

?>