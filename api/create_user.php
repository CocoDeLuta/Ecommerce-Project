<?php

// Abrir a conexão
require_once('../data/connection.inc.php');
require_once('user.dao.php');

// Instanciar o DAO
$userDAO = new userDAO($pdo);

// Receber os dados do cliente
$json = file_get_contents('php://input');

// Criar um objeto a partir do JSON
$user = json_decode($json);
console.log($user);

// Conteúdo de resposta para o cliente
try{
    $user = $userDAO->iensert($user);
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

?>