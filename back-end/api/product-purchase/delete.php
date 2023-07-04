<?php
    //Deletar um usuario do banco de dados

    //Abrir a conexão
    require_once('../../data/connection.inc.php');
    require_once('pro-pur.dao.php');
    include("../enable-cors.php");

    //Instanciar o DAO
    $pro_purDAO = new pro_purDAO($pdo);

    //Receber os dados do cliente
    $id_compra = $_REQUEST['id_compra'];
    $id_produto = $_REQUEST['id_produto'];

    //Conteúdo de resposta para o cliente
    $responseBody = "";

    if(!$id_compra && !$id_produto) {
        http_response_code(400);
        $responseBody = '{ "message": "ID não informado"}';
    } else {

        $qtd = $pro_purDAO->delete($id_compra, $id_produto);
        if($qtd == 0) {
            http_response_code(404);
            $responseBody = '{ "message": "ID não existe"}';
        }
    }

    //Gerar a resposta para o cliente
    header("Content-type: application/json");
    print_r($responseBody);

    
?>