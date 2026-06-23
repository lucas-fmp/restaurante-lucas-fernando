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
('Bife Acebolado', 'Proteína', 15.00);

-- Seeder admin user: username 'admin', password 'admin123'
INSERT INTO users (username, password, full_name, email) VALUES 
('admin', 'c73ea2fa75377ffbc0ea2904110f0824:e3b99bc97a0e8300c52dea266bbed842db3c360375faefe1c3fa1199b86d8ede540c6edd3ba439b370d1b68b51884fa15c861c2abf21307e03d79c21a7041b80', 'Administrador', 'admin@restaurante.com');

INSERT INTO user_settings (user_id, theme, notifications_enabled) VALUES (1, 'light', 1);
