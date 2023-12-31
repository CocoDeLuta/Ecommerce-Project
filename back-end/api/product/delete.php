<?php
    //Deletar um usuario do banco de dados

    //Abrir a conexão
    require_once('../../data/connection.inc.php');
    require_once('product.dao.php');
    include("../enable-cors.php");

    //Instanciar o DAO
    $productDAO = new productDAO($pdo);

    //Receber os dados do cliente
    $id = $_REQUEST['id'];

    //Conteúdo de resposta para o cliente
    $responseBody = "";

    if(!$id) {
        http_response_code(400);
        $responseBody = '{ "message": "ID não informado"}';
    } else {

        $qtd = $productDAO->delete($id);
        if($qtd == 0) {
            http_response_code(404);
            $responseBody = '{ "message": "ID não existe"}';
        }
    }

    //Gerar a resposta para o cliente
    http_response_code(200);
    header("Content-type: application/json");
    print_r($responseBody);

    
?>