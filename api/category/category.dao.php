<?php

class categoryDAO{
    private $pdo;
    public function __construct($pdo){
        $this->pdo = $pdo;
    }

    //inserir um usuario no banco de dados
    public function insert($category){
        
    
        $stmt = $this->pdo->prepare("INSERT INTO tb_categoria
            (nome, descricao)
            VALUES (:nome, :descricao);");

        //substituir os valores do SQL
        $stmt->bindValue("nome", $category->nome);
        $stmt->bindValue("descricao", $category->descricao);

        $stmt->execute();   
        $category->id = $this->pdo->lastInsertId();
        $category = clone $category;
        return $category;
    }

    //obter todos os usuarios da tabela
    public function getAll(){
        $stmt = $this->pdo->prepare("SELECT * FROM tb_categoria");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    //deletar um usuario do banco de dados
    public function delete($id){
        $stmt = $this->pdo->prepare("DELETE FROM tb_categoria
        WHERE id=:id");

        $stmt->bindValue("id", $id);

        $stmt->execute();

        //retorna a quantidade de linhas afetadas
        return $stmt->rowCount();
    }

    //atualizar um usuario no banco de dados
    public function update($id, $category){
        $stmt = $this->pdo->prepare("UPDATE tb_categoria SET
                nome = :nome, descricao = :descricao
            WHERE id = :id");

        $data = [
            "id" => $id,
            "nome" => $category->nome,
            "descricao" => $category->descricao
        ];

        $stmt->execute($data);

        //retorna a qtd de linhas afetadas
        return $stmt->rowCount();
    }
}

?>