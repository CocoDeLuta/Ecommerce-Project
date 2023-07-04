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

$stmt = $pdo->prepare("SELECT * FROM tb_categoria WHERE nome = :nome");
$stmt->bindValue(":nome", $category->nome);
$stmt->execute();

$verific = $stmt->fetch(PDO::FETCH_ASSOC);

if ($verific && $verific['nome'] == $category->nome) {
    print_r($verific['nome']);
    http_response_code(401);
    $responseBody = '{ "message": "Categoria já cadastrada" }';
    echo $responseBody;
    exit();
}

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