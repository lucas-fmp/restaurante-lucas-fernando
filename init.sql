CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Aberto'
);

-- NOTE: Initial user passwords must be stored as bcrypt hashes.
-- To generate `init.sql` with hashed passwords run: `node scripts/hash-init-users.js`

INSERT INTO items (name, category) VALUES ('Arroz Branco', 'Base'), ('Feijão Preto', 'Grão');
