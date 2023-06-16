<?php
    //Atualizar um usuario no banco de dados

    //Abrir a conexão
    require_once('../../data/connection.inc.php');
    require_once('pro-pur.dao.php');

    //Instanciar o DAO
    $pro_purDAO = new pro_purDAO($pdo);

    //Receber os dados do cliente
    $id_compra = $_REQUEST['id_compra'];
    $id_produto = $_REQUEST['id_produto'];

    //Conteúdo de resposta para o cliente
    $responseBody = "";

    if(!$id_compra && !$id_produto) {
        http_response_code(400);
        $responseBody = '{ "message": "Usuario não informado"}';
    } else {
        //Receber os dados do cliente
        $json = file_get_contents('php://input');

        //Criar um objeto a partir do JSON
        $obj = json_decode($json);
       
        //Atualizar o usuario no banco de dados
        $obj = $pro_purDAO->update($id_compra, $id_produto, $obj);
    }

    //Gerar a resposta para o cliente
    header("Content-type: application/json");
    print_r($responseBody);

?>