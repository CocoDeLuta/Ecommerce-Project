<?php
    //Atualizar um usuario no banco de dados

    //Abrir a conexão
    require_once('../data/connection.inc.php');
    require_once('user.dao.php');

    //Instanciar o DAO
    $userDAO = new userDAO($pdo);

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
        $user = json_decode($json);

        //Atualizar o usuario no banco de dados
        $user = $userDAO->update($id, $user);
    }

    //Gerar a resposta para o cliente
    header("Content-type: application/json");
    print_r($responseBody);

?>