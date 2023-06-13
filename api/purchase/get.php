<?php

    //Método para entregar uma lista de usuarios para o cliente
    //Formato de entrega: JSON
    require_once('../../data/connection.inc.php');
    require_once('purchase.dao.php');

    $purchaseDAO = new purchaseDAO($pdo);

    //buscar os usuarios no DB
    $purchase = $purchaseDAO->getAll();

    //transformar os usuarios em JSON
    $responseBody = json_encode($purchase);

    //gerar a resposta para o cliente
    header("Content-type: application/json");
    print_r($responseBody);

?>