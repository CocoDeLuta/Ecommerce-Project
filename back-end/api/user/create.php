<?php

// Abrir a conexão
require_once('../../data/connection.inc.php');
require_once('user.dao.php');
include("../enable-cors.php");

// Instanciar o DAO
$userDAO = new userDAO($pdo);

// Receber os dados do cliente
$json = file_get_contents('php://input');

// Criar um objeto a partir do JSON
$user = json_decode($json);
//print_r($user);

// Verificar se o email e o nome já estão inseridos no banco de dados
 $stmt = $pdo->prepare("SELECT * FROM tb_usuario WHERE nome = :nome OR email = :email");
 $stmt->bindValue(":nome", $user->nome);
 $stmt->bindValue(":email", $user->email);
 $stmt->execute();

 $verific = $stmt->fetch(PDO::FETCH_ASSOC);

 if ($verific && $verific['nome'] == $user->nome) {
        print_r($verific['nome']);
        http_response_code(401);
        $responseBody = '{ "message": "Usuário já cadastrado" }';
        echo $responseBody;
        exit();
    } 
    if (($verific && $verific['email'] == $user->email)) {
        print_r($verific['email']);
        http_response_code(401);
        $responseBody = '{ "message": "Email já cadastrado" }';
        echo $responseBody;
        exit();
    }
 

// Conteúdo de resposta para o cliente
try{
    $user = $userDAO->insert($user);
    $responseBody = json_encode($user); // Transf. em JSON
}catch(Exception $e){
    http_response_code(400);
    $responseBody = ["erro" => "Não foi possível inserir o usuário"];
}

// Inserir o usuário no banco de dados
//$user = $userDAO->insert($user);
$responseBody = json_encode($user); // Transf. em JSON

// Gerar a resposta para o cliente
header("Content-type: application/json");
echo($responseBody);
http_response_code(201);

?>