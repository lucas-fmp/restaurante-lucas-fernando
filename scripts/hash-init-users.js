const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

async function writeInit() {
  const adminPass = process.env.ADMIN_PASS || 'admin123';
  const saltRounds = 10;
  const hash = await bcrypt.hash(adminPass, saltRounds);

  const sql = `CREATE TABLE IF NOT EXISTS users (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    username VARCHAR(50) UNIQUE NOT NULL,\n    password VARCHAR(255) NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS items (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    category VARCHAR(50)\n);\n\nCREATE TABLE IF NOT EXISTS orders (\n    id INT AUTO_INCREMENT PRIMARY KEY,\n    customer_name VARCHAR(100),\n    status VARCHAR(20) DEFAULT 'Aberto'\n);\n\nINSERT INTO users (username, password) VALUES ('admin', '${hash}');\nINSERT INTO items (name, category) VALUES ('Arroz Branco', 'Base'), ('Feijão Preto', 'Grão');\n`;

  const outPath = path.join(__dirname, '..', 'init.sql');
  fs.writeFileSync(outPath, sql, { encoding: 'utf8' });
  console.log(`Wrote ${outPath} with hashed admin password (use ADMIN_PASS env to set a different password).`);
}

writeInit().catch(err => {
  console.error('Failed to write init.sql:', err);
  process.exit(1);
});
