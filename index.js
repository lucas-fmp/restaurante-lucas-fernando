const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();

const dbConfig = {
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'marmitadb'
};

let pool;

async function connectWithRetry() {
    console.log('🔍 [INFRA] Tentando conectar ao MySQL...');
    for (let i = 1; i <= 10; i++) {
        try {
            pool = mysql.createPool(dbConfig);
            await pool.query('SELECT 1');
            console.log('✅ [DATABASE] Conectado ao MySQL com sucesso!');
            return;
        } catch (err) {
            console.log(`⚠️ [DATABASE] Tentativa ${i}/10 falhou. Aguardando...`);
            await new Promise(res => setTimeout(res, 3000));
        }
    }
    process.exit(1);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const { tab, error, success } = req.query;
    res.render('login', { tab: tab || 'login', error: error || null, success: success || null });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) return res.redirect('/?tab=login&error=Usuário+ou+senha+inválidos');
        const match = await bcrypt.compare(password, rows[0].password);
        if (match) return res.redirect('/dashboard');
        return res.redirect('/?tab=login&error=Usuário+ou+senha+inválidos');
    } catch (err) {
        res.redirect('/?tab=login&error=Erro+interno.+Tente+novamente.');
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.redirect('/?tab=register&error=Usuário+e+senha+são+obrigatórios');
    try {
        const [rows] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
        if (rows.length > 0) return res.redirect('/?tab=register&error=Usuário+já+existe');
        const hash = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash]);
        return res.redirect('/?tab=login&success=Conta+criada!+Agora+faça+o+login.');
    } catch (err) {
        res.redirect('/?tab=register&error=Erro+interno.+Tente+novamente.');
    }
});

app.get('/dashboard', async (req, res) => {
    const [items] = await pool.query('SELECT * FROM items');
    const [orders] = await pool.query('SELECT * FROM orders');
    res.render('dashboard', { items, orders });
});

connectWithRetry().then(() => {
    app.listen(3000, () => console.log('🚀 MARMITATECH PRO ONLINE NA PORTA 3000'));
});
