<?php

class purchaseDAO{
    private $pdo;
    public function __construct($pdo){
        $this->pdo = $pdo;
    }

    //inserir um usuario no banco de dados
    public function insert($purchase){
    
        $stmt = $this->pdo->prepare("INSERT INTO tb_compra
            (id_usuario, valor, data_compra)
            VALUES (:id_usuario, :valor, :data_compra);");

        //substituir os valores do SQL
        $stmt->bindValue("id_usuario", $purchase->id_usuario);
        $stmt->bindValue("valor", $purchase->valor);
        $stmt->bindValue("data_compra", $purchase->data_compra);

        $stmt->execute();   
        $purchase->id = $this->pdo->lastInsertId();
        $purchase = clone $purchase;
        return $purchase;
    }

    //obter todos os usuarios da tabela
    public function getAll(){
        $stmt = $this->pdo->prepare("SELECT * FROM tb_compra");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    //deletar um usuario do banco de dados
    public function delete($id){
        $stmt = $this->pdo->prepare("DELETE FROM tb_compra
        WHERE id=:id");

        $stmt->bindValue("id", $id);

        $stmt->execute();

        //retorna a quantidade de linhas afetadas
        return $stmt->rowCount();
    }

    //atualizar um usuario no banco de dados
    public function update($id, $purchase){
        $stmt = $this->pdo->prepare("UPDATE tb_compra SET
                id_usuario = :id_usuario, valor = :valor, data_compra = :data_compra
            WHERE id = :id");

        $data = [
            "id" => $id,
            "id_usuario" => $purchase->id_usuario,
            "valor" => $purchase->valor,
            "data_compra" => $purchase->data_compra
        ];

        $stmt->execute($data);

        //retorna a qtd de linhas afetadas
        return $stmt->rowCount();
    }
}

?>