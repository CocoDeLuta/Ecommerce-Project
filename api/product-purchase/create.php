<?php

// Abrir a conexão
require_once('../../data/connection.inc.php');
require_once('pro-pur.dao.php');

// Instanciar o DAO
$pro_purDAO = new pro_purDAO($pdo);

// Receber os dados do cliente
$json = file_get_contents('php://input');

// Criar um objeto a partir do JSON
$obj = json_decode($json);

// Inserir no banco
try{
    $obj = $pro_purDAO->insert($obj);
    $responseBody = json_encode($obj); // Transf. em JSON
}catch(Exception $e){
    http_response_code(400);
    $responseBody = ["erro" => "Não foi possível inserir o usuário"];
}

// Resposta para o cliente
$responseBody = json_encode($obj); // Transf. em JSON

// Gerar a resposta para o cliente
header("Content-type: application/json");
echo($responseBody);

?>