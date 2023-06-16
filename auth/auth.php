<?php

require_once("lib/jwt.inc.php");
require_once("config.php");

class Auth {
    private $pdo;

    public function __construct() {
        // Inicialize a conexão PDO aqui
        $this->pdo = new PDO("mysql:host=localhost;dbname=mpbdb", "root", "");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function login() {
        $json = file_get_contents('php://input');
        $credentials = json_decode($json);

        $responseBody = '';

        $stmt = $this->pdo->prepare("SELECT * FROM tb_usuario WHERE nome = :nome AND senha = :senha");
        $stmt->bindValue(":nome", $credentials->nome);
        $stmt->bindValue(":senha", $credentials->senha);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && $user['nome'] == $credentials->nome && $user['senha'] == $credentials->senha) {
            if ($user['admin'] == 1){
                $payload = [
                    "id" => $user['id'],
                    "username" => $user['nome'],
                    "role" => "admin"
                ];
            } else {
                $payload = [
                    "id" => $user['id'],
                    "username" => $user['nome'],
                    "role" => "user"
                ];
            }
            
            $token = JwtUtil::encode($payload, JWT_SECRET_KEY);

            $responseBody = '{ "token": "'.$token.'", "role": "'.$payload['role'].'" }';
        } else {
            http_response_code(401);
            $responseBody = '{ "message": "Credencial inválida" }';
        }

        echo $responseBody;
    }
}

$auth = new Auth();
$auth->login();

?>
