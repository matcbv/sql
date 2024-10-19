CREATE DATABASE pizzaria;

USE pizzaria;

-- Tabela de Bordas
CREATE TABLE bordas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recheio_borda VARCHAR(45) NOT NULL
);

-- Tabela de Massas
CREATE TABLE massas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_massa VARCHAR(45) NOT NULL
);

-- Tabela de Sabores
CREATE TABLE sabores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sabor VARCHAR(100) NOT NULL
);

-- Tabela de Pizzas
CREATE TABLE pizzas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_borda INT NOT NULL,
    id_massa INT NOT NULL,
    CONSTRAINT fk_borda FOREIGN KEY (id_borda) REFERENCES bordas(id),
    CONSTRAINT fk_massa FOREIGN KEY (id_massa) REFERENCES massas(id)
);

-- Tabela para associar Pizzas a Múltiplos Sabores
CREATE TABLE pizza_sabores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_pizza INT NOT NULL,
    id_sabor INT NOT NULL,
    CONSTRAINT fk_pizza FOREIGN KEY (id_pizza) REFERENCES pizzas(id),
    CONSTRAINT fk_sabor FOREIGN KEY (id_sabor) REFERENCES sabores(id)
);

-- Tabela de Status de Pedidos
CREATE TABLE status_pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(45) NOT NULL
);

CREATE TABLE pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_status INT NOT NULL,
    id_pizza INT NOT NULL,
    CONSTRAINT fk_status FOREIGN KEY id_status REFERENCES status_pedido(id),
    CONSTRAINT fk_pizza_pedido FOREIGN KEY id_pizza REFERENCES pizzas(id)
)