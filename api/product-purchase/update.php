<?php
    //Atualizar um usuario no banco de dados

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
        $responseBody = '{ "message": "Usuario não informado"}';
    } else {
        //Receber os dados do cliente
        $json = file_get_contents('php://input');

        //Criar um objeto a partir do JSON
        $obj = json_decode($json);
       
        //Atualizar o usuario no banco de dados
        $obj = $pro_purDAO->update($compra_id, $produto_id, $obj);
    }

    //Gerar a resposta para o cliente
    header("Content-type: application/json");
    print_r($responseBody);

?>