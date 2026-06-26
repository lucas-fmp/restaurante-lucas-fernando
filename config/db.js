const mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'restaurante_lucas'
};

const pool = mysql.createPool(dbConfig);

async function connectWithRetry() {
    console.log('🔍 [INFRA] Tentando conectar ao MySQL...');
    for (let i = 1; i <= 10; i++) {
        try {
            await pool.query('SELECT 1');
            console.log('✅ [DATABASE] Conectado ao MySQL com sucesso!');
            return;
        } catch (_err) {
            console.log(`⚠️ [DATABASE] Tentativa ${i}/10 falhou. Aguardando...`);
            await new Promise(res => setTimeout(res, 3000));
        }
    }
    process.exit(1);
}

module.exports = { pool, connectWithRetry, dbConfig };
