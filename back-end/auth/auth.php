<?php

require_once("lib/jwt.inc.php");
require_once("config.php");
include("../api/enable-cors.php");


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
                    "admin" => 1
                ];
                
            } else {
                $payload = [
                    "id" => $user['id'],
                    "username" => $user['nome'],
                    "admin" => 0
                ];
                
            }

            // Generate the JWT here
            $token = JwtUtil::encode($payload, JWT_SECRET_KEY);
            
            
            // Set the appropriate response headers to indicate JSON content
            header('Content-Type: application/json');
            
            $responseBody = json_encode(['token' => $token, 'admin' => $user['admin']]);
        } else {
            $responseBody = json_encode(['message' => 'Credencial inválida']);
            // Set the appropriate response headers to indicate JSON content
            header('Content-Type: application/json');
            http_response_code(401);
        }

        echo $responseBody;
        
    }
}

$auth = new Auth();
$auth->login();

?>