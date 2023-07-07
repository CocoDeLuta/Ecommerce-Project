<?php

    //MÃ©todo para entregar uma lista de usuarios para o cliente
    //Formato de entrega: JSON
    require_once('../../data/connection.inc.php');
    require_once('category.dao.php');
    include("../enable-cors.php");

    $categoriaDAO = new categoryDAO($pdo);

    $id = $_REQUEST['id'];
    //buscar os usuarios no DB
    $cat = $categoriaDAO->getOne($id);

    //transformar os usuarios em JSON
    $responseBody = json_encode($cat);

    //gerar a resposta para o cliente
    header("Content-type: application/json");
    print_r($responseBody);
    http_response_code(200);

?>