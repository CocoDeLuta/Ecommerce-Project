<?php
    //Atualizar um usuario no banco de dados

    //Abrir a conexão
    require_once('../../data/connection.inc.php');
    require_once('category.dao.php');

    //Instanciar o DAO
    $categoryDAO = new categoryDAO($pdo);

    //Receber os dados do cliente
    $id = $_REQUEST['id'];

    //Conteúdo de resposta para o cliente
    $responseBody = "";

    if(!$id) {
        http_response_code(400);
        $responseBody = '{ "message": "Usuario não informado"}';
    } else {
        //Receber os dados do cliente
        $json = file_get_contents('php://input');

        //Criar um objeto a partir do JSON
        $category = json_decode($json);

        //Atualizar o usuario no banco de dados
        $category = $categoryDAO->update($id, $category);
    }

    //Gerar a resposta para o cliente
    header("Content-type: application/json");
    print_r($responseBody);

?>