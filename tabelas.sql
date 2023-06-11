CREATE DATABASE mpbdb;

USE mpbdb;

CREATE TABLE tb_usuario (
id INTEGER PRIMARY KEY,
nome VARCHAR(155) NOT NULL,
email VARCHAR(155) NOT NULL,
senha VARCHAR(155) NOT NULL,
nascimento VARCHAR(155) NOT NULL,
admin TINYINT NOT NULL DEFAULT 0
);

CREATE TABLE tb_produto (
id INTEGER PRIMARY KEY,
nome VARCHAR(155) NOT NULL,
descricao VARCHAR(375),
preco FLOAT NOT NULL,
quantidade INT NOT NULL
);

CREATE TABLE tb_categoria (
id INTEGER PRIMARY KEY,
nome VARCHAR(155) NOT NULL
);

CREATE TABLE tb_compra (
id INTEGER PRIMARY KEY,
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
