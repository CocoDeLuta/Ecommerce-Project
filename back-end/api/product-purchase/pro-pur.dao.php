<?php

class pro_purDAO{
    private $pdo;
    public function __construct($pdo){
        $this->pdo = $pdo;
    }

    //inserir um usuario no banco de dados
    public function insert($obj){
    
        $stmt = $this->pdo->prepare("INSERT INTO tb_compra_produto
            (id_compra, id_produto, quantidade)
            VALUES (:id_compra, :id_produto, :quantidade);");

        //substituir os valores do SQL
        $stmt->bindValue("id_compra", $obj->id_compra);
        $stmt->bindValue("id_produto", $obj->id_produto);
        $stmt->bindValue("quantidade", $obj->quantidade);

        $stmt->execute();   
        $obj = clone $obj;
        return $obj;
    }

    //obter todos os usuarios da tabela
    public function getAll(){
        $stmt = $this->pdo->prepare("SELECT * FROM tb_compra_produto");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    //deletar um usuario do banco de dados
    public function delete($pur_id, $prod_id){
        $stmt = $this->pdo->prepare("DELETE FROM tb_compra_produto
        WHERE id_compra = :pur_id AND id_produto = :prod_id");

        $stmt->bindValue(":pur_id", $pur_id);
        $stmt->bindValue(":prod_id", $prod_id);

        $stmt->execute();

        //retorna a quantidade de linhas afetadas
        return $stmt->rowCount();
    }

    //atualizar um usuario no banco de dados
    public function update($pur_id, $prod_id, $obj){
        
        $stmt = $this->pdo->prepare("UPDATE tb_compra_produto SET
                id_compra = :id_compra, id_produto = :id_produto, quantidade = :quantidade
            WHERE id_compra = :pur_id AND id_produto = :prod_id");

        $data = [
            "id_compra" => $obj->id_compra,
            "id_produto" => $obj->id_produto,
            "quantidade" => $obj->quantidade,
        ];

        $data["pur_id"] = $pur_id;
        $data["prod_id"] = $prod_id;
        

        $stmt->execute($data);

        //retorna a qtd de linhas afetadas
        return $stmt->rowCount();
    }
}

?>