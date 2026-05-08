CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Aberto'
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    item_id INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);

INSERT INTO items (name, category, price) VALUES ('Arroz Branco', 'Base', 5.00), ('Feijao Preto', 'Grao', 3.50);

-- Seeder admin user: username 'admin', password 'admin123'
INSERT INTO users (username, password) VALUES ('admin', 'c73ea2fa75377ffbc0ea2904110f0824:e3b99bc97a0e8300c52dea266bbed842db3c360375faefe1c3fa1199b86d8ede540c6edd3ba439b370d1b68b51884fa15c861c2abf21307e03d79c21a7041b80');
