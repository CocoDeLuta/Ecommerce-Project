<?php

    //Método para entregar uma lista de usuarios para o cliente
    //Formato de entrega: JSON
    require_once('../../data/connection.inc.php');
    require_once('category.dao.php');

    $categoryDAO = new categoryDAO($pdo);

    //buscar os usuarios no DB
    $category = $categoryDAO->getAll();

    //transformar os usuarios em JSON
    $responseBody = json_encode($category);

    //gerar a resposta para o cliente
    header("Content-type: application/json");
    print_r($responseBody);

?>