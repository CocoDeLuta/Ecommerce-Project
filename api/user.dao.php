<?php

class userDAO{
    private $pdo;
    public function __construct($pdo){
        $this->pdo = $pdo;
    }

    //inserir um usuario no banco de dados
    public function insert($user){
    
        //console.log($user);

        $stmt = $this->pdo->prepare("INSERT INTO tb_usuario
            (nome, email, senha, nascimento)
            VALUES (:nome, :email, :senha, :nascimento");

        //substituir os valores do SQL
        $stmt->bindValue("nome", $user->nome);
        $stmt->bindValue("email", $user->email);
        $stmt->bindValue("senha", $user->senha);
        $stmt->bindValue("nascimento", $user->nascimento);

        //$stmt->execute();
        $user = clone $user;
        $user->id = $this->pdo->lastInsertId();
        return $user;
    }

    //obter todos os usuarios da tabela
    public function getAll(){
        $stmt = $this->pdo->prepare("SELECT * FROM tb_usuario");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_CLASS);
    }

    //deletar um usuario do banco de dados
    public function delete($id){
        $stmt = $this->pdo->prepare("DELETE FROM tb_usuario
        WHERE id=:id");

        $stmt->bindValue("id", $id);

        $stmt->execute();

        //retorna a quantidade de linhas afetadas
        return $stmt->rowCount();
    }

    //atualizar um usuario no banco de dados
    public function update($id, $user){
        $stmt = $this->pdo->prepare("UPDATE tb_usuario SET
                nome = :nome, nascimento = :nascimento,
                email = :email, senha = :senha
            WHERE id = :id");

        $data = [
            "id" => $id,
            "nome" => $user->nome,
            "nascimento" => $user->nascimento,
            "email" => $user->email,
            "senha" => $user->senha
        ];

        $stmt->execute($data);

        //retorna a qtd de linhas afetadas
        return $stmt->rowCount();
    }
}

?>