<?php

// Abrir a conexão
require_once('../../data/connection.inc.php');
require_once('category.dao.php');
include("../enable-cors.php");

// Instanciar o DAO
$categoryDAO = new categoryDAO($pdo);

// Receber os dados do cliente
$json = file_get_contents('php://input');

// Criar um objeto a partir do JSON
$category = json_decode($json);

// Conteúdo de resposta para o cliente
try{
    $category = $categoryDAO->insert($category);
    $responseBody = json_encode($category); // Transf. em JSON
}catch(Exception $e){
    http_response_code(400);
    $responseBody = ["erro" => "Não foi possível inserir o usuário"];
}

// Inserir o usuário no banco de dados
$responseBody = json_encode($category); // Transf. em JSON

// Gerar a resposta para o cliente
header("Content-type: application/json");
echo($responseBody);

?>