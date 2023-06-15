CREATE DATABASE mpbdb;

USE mpbdb;

CREATE TABLE tb_usuario (
id INTEGER AUTO_INCREMENT PRIMARY KEY ,
nome VARCHAR(155) NOT NULL UNIQUE,
email VARCHAR(155) NOT NULL UNIQUE,
senha VARCHAR(155) NOT NULL,
nascimento VARCHAR(155) NOT NULL,
admin TINYINT NOT NULL DEFAULT 0
);

CREATE TABLE tb_categoria (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(155) NOT NULL,
descricao VARCHAR(375)
);

CREATE TABLE tb_produto (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(155) NOT NULL,
descricao VARCHAR(375),
id_categoria INTEGER REFERENCES tb_categoria(id),
preco FLOAT NOT NULL,
quantidade INT NOT NULL
);

CREATE TABLE tb_compra (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
id_usuario INTEGER,
valor FLOAT,
data_compra DATE,
FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id)
);

CREATE TABLE tb_compra_produto (
id_compra INTEGER,
id_produto INTEGER,
quantidade FLOAT NOT NULL,
FOREIGN KEY (id_compra) REFERENCES tb_compra(id),
FOREIGN KEY (id_produto) REFERENCES tb_produto(id)
);
