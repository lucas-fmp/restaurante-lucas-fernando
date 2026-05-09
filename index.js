const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const crypto = require('crypto');
const path = require('path');

const app = express();

const dbConfig = {
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'marmitadb'
};

let pool;

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ':' + derivedKey.toString('hex'));
        });
    });
}

function verifyPassword(password, hash) {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(':');
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
            if (err) reject(err);
            resolve(key === derivedKey.toString('hex'));
        });
    });
}

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

app.get('/logout', (req, res) => {
    res.redirect('/?tab=login&success=Desconectado+com+sucesso!');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) return res.redirect('/?tab=login&error=Usuário+ou+senha+inválidos');
        const match = await verifyPassword(password, rows[0].password);
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
        const hash = await hashPassword(password);
        await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash]);
        return res.redirect('/?tab=login&success=Conta+criada!+Agora+faça+o+login.');
    } catch (err) {
        res.redirect('/?tab=register&error=Erro+interno.+Tente+novamente.');
    }
});

app.get('/dashboard', async (req, res) => {
    const [items] = await pool.query('SELECT * FROM items');
    const [orders] = await pool.query(`
        SELECT o.id, o.customer_name, o.status, GROUP_CONCAT(i.name SEPARATOR ', ') AS item_names
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN items i ON oi.item_id = i.id
        GROUP BY o.id
        ORDER BY o.id DESC
    `);
    res.render('dashboard', { items, orders });
});

app.post('/add-item', async (req, res) => {
    const { name, category, price } = req.body;

    // Validation
    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Nome é obrigatório e não pode estar vazio.' });
    }
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
        return res.status(400).json({ error: 'Preço deve ser um número positivo.' });
    }

    try {
        await pool.query('INSERT INTO items (name, category, price) VALUES (?, ?, ?)', [name.trim(), category, priceNum]);
        res.status(201).json({ message: 'Item adicionado com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro interno. Tente novamente.' });
    }
});

app.post('/orders', async (req, res) => {
    const { customer_name, item_ids } = req.body;

    if (!customer_name || customer_name.trim() === '' || !item_ids || item_ids.length === 0) {
        return res.status(400).json({ error: 'Nome do cliente e pelo menos um item são obrigatórios.' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.query('INSERT INTO orders (customer_name, status) VALUES (?, ?)', [customer_name.trim(), 'Aberto']);
        const orderId = result.insertId;

        for (const itemId of item_ids) {
            await connection.query('INSERT INTO order_items (order_id, item_id) VALUES (?, ?)', [orderId, itemId]);
        }

        await connection.commit();
        res.status(201).json({ message: 'Pedido criado com sucesso.' });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: 'Erro interno. Tente novamente.' });
    } finally {
        connection.release();
    }
});

app.get('/kanban', async (req, res) => {
    try {
        const [orders] = await pool.query(`
            SELECT o.id, o.customer_name, o.status, GROUP_CONCAT(i.name SEPARATOR ', ') AS item_names
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN items i ON oi.item_id = i.id
            GROUP BY o.id
            ORDER BY o.id DESC
        `);
        res.render('kanban', { orders });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao carregar painel Kanban.' });
    }
});

app.put('/orders/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Aberto', 'Cozinha', 'Entrega', 'Entregue'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Status inválido.' });
    }

    try {
        await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
        res.status(200).json({ message: 'Pedido atualizado com sucesso.' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar pedido.' });
    }
});

app.get('/admin/export', async (req, res) => {
    try {
        const [orders] = await pool.query(`
            SELECT o.id, o.customer_name, o.status, GROUP_CONCAT(i.name SEPARATOR ', ') AS item_names, 
                   SUM(i.price) AS total_value, o.id AS created_at
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN items i ON oi.item_id = i.id
            GROUP BY o.id
            ORDER BY o.id DESC
        `);

        // Gerar CSV
        let csvContent = 'ID,Cliente,Itens,Status,Valor Total (R$)\n';
        
        orders.forEach(order => {
            const id = order.id;
            const customer = `"${order.customer_name.replace(/"/g, '""')}"`;
            const items = `"${(order.item_names || '').replace(/"/g, '""')}"`;
            const status = order.status;
            const value = (order.total_value || 0).toFixed(2);
            
            csvContent += `${id},${customer},${items},${status},${value}\n`;
        });

        // Definir headers para download
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="relatorio_vendas_${new Date().toISOString().split('T')[0]}.csv"`);
        res.send('\ufeff' + csvContent); // BOM para UTF-8 no Excel
    } catch (err) {
        res.status(500).json({ error: 'Erro ao gerar relatório.' });
    }
});

connectWithRetry().then(() => {
    app.listen(3000, () => console.log('🚀 MARMITATECH PRO ONLINE NA PORTA 3000'));
});
