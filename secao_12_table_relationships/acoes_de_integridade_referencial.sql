------------ Sobre ------------

-- Ações de integridade referencial servem para definir o comportamento de chaves estrangeiras em bancos de dados relacionais para manter a integridade e consistência dos dados ao lidar com operações que afetam registros relacionados, como exclusão (DELETE) ou atualização (UPDATE).


------------ Nomeclaturas ------------

------------ CASCADE ------------

-- Com a opção CASCADE, os registros relacionados a um registro principal também são afetados por ações como DELETE e UPDATE. Ex.:

-- Clientes: 

    CREATE TABLE clientes (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL, sobrenome VARCHAR(100) NOT NULL,
    telefone VARCHAR(100) NOT NULL,
    endereco VARCHAR(250) NOT NULL
    );

-- Pedidos:

    CREATE TABLE pedidos (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_cliente INT NOT NULL,
    produto VARCHAR(250) NOT NULL,
    preco FLOAT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE
    );

------------ RESTRICT ------------

-- Com a opção RESTRICT, impedimos a exclusão ou atualização de um registro que tenha dependências em outras tabelas. Ela serve como uma proteção para evitar exclusões ou atualizações acidentais que possam deixar a base de dados inconsistente.

-- Clientes: 

    CREATE TABLE clientes (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL, sobrenome VARCHAR(100) NOT NULL,
    telefone VARCHAR(100) NOT NULL,
    endereco VARCHAR(250) NOT NULL
    );

-- Pedidos:

    CREATE TABLE pedidos (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    id_cliente INT NOT NULL,
    produto VARCHAR(250) NOT NULL,
    preco FLOAT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE RESTRICT
    );

-- Obs.: O RESTRICT é aplicado por padrão em muitos bancos de dados, como no MySQL Workbench, então você pode omitir ON DELETE RESTRICT se desejar.

------------ NO ACTION ------------

