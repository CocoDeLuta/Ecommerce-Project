<?php

    //MÃ©todo para entregar uma lista de usuarios para o cliente
    //Formato de entrega: JSON
    require_once('../../data/connection.inc.php');
    require_once('product.dao.php');
    include("../enable-cors.php");

    $productDAO = new productDAO($pdo);

    $id = $_REQUEST['id'];
    //buscar os usuarios no DB
    $product = $productDAO->getOne($id);

    //transformar os usuarios em JSON
    $responseBody = json_encode($product);

    //gerar a resposta para o cliente
    header("Content-type: application/json");
    echo($responseBody);

?>