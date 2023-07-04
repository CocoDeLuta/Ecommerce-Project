<?php
    //Deletar um usuario do banco de dados

    //Abrir a conexão
    require_once('../../data/connection.inc.php');
    require_once('category.dao.php');
    include("../enable-cors.php");

    //Instanciar o DAO
    $categoryDAO = new categoryDAO($pdo);

    //Receber os dados do cliente
    $id = $_REQUEST['id'];

    //Conteúdo de resposta para o cliente
    $responseBody = "";

    if(!$id) {
        http_response_code(400);
        $responseBody = '{ "message": "ID não informado"}';
    } else {

        $qtd = $categoryDAO->delete($id);
        if($qtd == 0) {
            http_response_code(404);
            $responseBody = '{ "message": "ID não existe"}';
        }
    }

    //Gerar a resposta para o cliente
    header("Content-type: application/json");
    print_r($responseBody);

    
?>