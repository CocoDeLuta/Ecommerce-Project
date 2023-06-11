<?php
    $servername = 'localhost';
    $port = 3306;
    $username = 'root';
    $password = '';
    $dbname = 'mpbdb';

    $pdo = new PDO(
        "mysql:host=$servername;port=$port;dbname=$dbname", 
        $username, 
        $password);

?>