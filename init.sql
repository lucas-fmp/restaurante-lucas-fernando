CREATE DATABASE IF NOT EXISTS marmitadb;
USE marmitadb;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(100),
    avatar_url VARCHAR(255),
    role VARCHAR(20) DEFAULT 'admin'
);

CREATE TABLE user_settings (
    user_id INT PRIMARY KEY,
    theme VARCHAR(20) DEFAULT 'light',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Aberto',
    total_value DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    item_id INT,
    quantity INT DEFAULT 1,
    notes TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

INSERT INTO items (name, category, price) VALUES 
('Arroz Branco', 'Base', 5.00), 
('Feijão Preto', 'Grão', 3.50),
('Bife Acebolado', 'Proteína', 15.00),
('Frango Assado', 'Proteína', 12.00),
('Salada Mista', 'Salada', 8.00),
('Batata Frita', 'Acompanhamento', 10.00),
('Refrigerante Lata', 'Bebida', 6.00),
('Suco Natural', 'Bebida', 8.00),
('Pudim', 'Sobremesa', 7.00);

-- Insert dummy orders for the dashboard
INSERT INTO orders (customer_name, status, total_value, created_at) VALUES 
('Maria Silva', 'Aberto', 28.00, DATE_SUB(NOW(), INTERVAL 2 HOUR)),
('João Souza', 'Cozinha', 35.50, DATE_SUB(NOW(), INTERVAL 3 HOUR)),
('Ana Paula', 'Entrega', 42.00, DATE_SUB(NOW(), INTERVAL 4 HOUR)),
('Carlos Lima', 'Entregue', 50.00, DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Beatriz Costa', 'Entregue', 25.00, DATE_SUB(NOW(), INTERVAL 2 DAY)),
('Fernando Alves', 'Entregue', 45.00, DATE_SUB(NOW(), INTERVAL 3 DAY)),
('Juliana Mendes', 'Aberto', 18.00, DATE_SUB(NOW(), INTERVAL 10 MINUTE)),
('Ricardo Gomes', 'Cozinha', 22.00, DATE_SUB(NOW(), INTERVAL 30 MINUTE));

-- Insert order items
INSERT INTO order_items (order_id, item_id, quantity) VALUES 
(1, 3, 1), (1, 1, 1), (1, 8, 1),
(2, 4, 1), (2, 2, 1), (2, 5, 1), (2, 7, 2),
(3, 3, 2), (3, 6, 1),
(4, 4, 2), (4, 1, 2), (4, 9, 2),
(5, 5, 2), (5, 8, 1),
(6, 3, 1), (6, 4, 1), (6, 7, 3),
(7, 6, 1), (7, 8, 1),
(8, 4, 1), (8, 6, 1);

-- Seeder admin user: username 'admin', password 'admin123'
INSERT INTO users (username, password, full_name, email) VALUES 
('admin', 'c73ea2fa75377ffbc0ea2904110f0824:e3b99bc97a0e8300c52dea266bbed842db3c360375faefe1c3fa1199b86d8ede540c6edd3ba439b370d1b68b51884fa15c861c2abf21307e03d79c21a7041b80', 'Administrador', 'admin@restaurante.com');

INSERT INTO user_settings (user_id, theme, notifications_enabled) VALUES (1, 'light', 1);
