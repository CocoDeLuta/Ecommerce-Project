<?php

// Abrir a conexão
require_once('../../data/connection.inc.php');
require_once('purchase.dao.php');
include("../enable-cors.php");

// Instanciar o DAO
$purchaseDAO = new purchaseDAO($pdo);

// Receber os dados do cliente
$json = file_get_contents('php://input');

// Criar um objeto a partir do JSON
$purchase = json_decode($json);

// Conteúdo de resposta para o cliente
try{
    $purchase = $purchaseDAO->insert($purchase);

    foreach($purchase->itens as $item) {
        $item->id_compra = $purchase->id;
        $prodPurDAO->insert($item); //ver variavel certa
    }
    $responseBody = json_encode($purchase); // Transf. em JSON
}catch(Exception $e){
    http_response_code(400);
    $responseBody = ["erro" => "Não foi possível inserir o usuário"];
}

// Inserir o usuário no banco de dados
$responseBody = json_encode($purchase); // Transf. em JSON

// Gerar a resposta para o cliente
header("Content-type: application/json");
echo($responseBody);

?>