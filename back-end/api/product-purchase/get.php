<?php

    //Método para entregar uma lista de usuarios para o cliente
    //Formato de entrega: JSON
    require_once('../../data/connection.inc.php');
    require_once('pro-pur.dao.php');
    include("../enable-cors.php");

    $pro_purDAO = new pro_purDAO($pdo);

    //buscar os usuarios no DB
    $obj = $pro_purDAO->getAll();

    //transformar os usuarios em JSON
    $responseBody = json_encode($obj);

    //gerar a resposta para o cliente
    header("Content-type: application/json");
    print_r($responseBody);

?>