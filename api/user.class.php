<?php
    class User{
        function __construct($nome, $email, $senha, $nascimento){
            $this->nome = $nome;
            $this->email = $email;
            $this->senha = $senha;
            $this->nascimento = $nascimento;
        }
    }
?>
