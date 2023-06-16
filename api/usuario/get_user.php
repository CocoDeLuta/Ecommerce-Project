<?php

    //Método para entregar uma lista de usuarios para o cliente
    //Formato de entrega: JSON
    require_once('../data/connection.inc.php');
    require_once('user.dao.php');

    $userDAO = new userDAO($pdo);

    //buscar os usuarios no DB
    $users = $userDAO->getAll();

    //transformar os usuarios em JSON
    $responseBody = json_encode($users);

    //gerar a resposta para o cliente
    header("Content-type: application/json");
    print_r($responseBody);

?>