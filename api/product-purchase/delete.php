<?php
    //Deletar um usuario do banco de dados

    //Abrir a conexão
    require_once('../../data/connection.inc.php');
    require_once('pro-pur.dao.php');

    //Instanciar o DAO
    $pro_purDAO = new pro_purDAO($pdo);

    //Receber os dados do cliente
    $id = $_REQUEST['compra_id, produto_id'];

    //Conteúdo de resposta para o cliente
    $responseBody = "";

    if(!$compra_id, $produto_id) {
        http_response_code(400);
        $responseBody = '{ "message": "ID não informado"}';
    } else {

        $qtd = $pro_purDAO->delete($compra_id, $produto_id);
        if($qtd == 0) {
            http_response_code(404);
            $responseBody = '{ "message": "ID não existe"}';
        }
    }

    //Gerar a resposta para o cliente
    header("Content-type: application/json");
    print_r($responseBody);

    
?>