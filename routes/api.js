const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const { requireAuth, hashPassword, verifyPassword } = require('../config/auth');

// Auth actions
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) return res.redirect('/?tab=login&error=Usuário+ou+senha+inválidos');
        
        const user = rows[0];
        const match = await verifyPassword(password, user.password);
        if (match) {
            req.session.userId = user.id;
            req.session.user = { id: user.id, username: user.username, full_name: user.full_name, role: user.role };
            return res.redirect('/dashboard');
        }
        return res.redirect('/?tab=login&error=Usuário+ou+senha+inválidos');
    } catch (err) {
        res.redirect('/?tab=login&error=Erro+interno.+Tente+novamente.');
    }
});

router.post('/register', async (req, res) => {
    const { username, password, full_name, email } = req.body;
    if (!username || !password) return res.redirect('/?tab=register&error=Usuário+e+senha+são+obrigatórios');
    try {
        const [rows] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
        if (rows.length > 0) return res.redirect('/?tab=register&error=Usuário+já+existe');
        
        const hash = await hashPassword(password);
        const [result] = await pool.query('INSERT INTO users (username, password, full_name, email) VALUES (?, ?, ?, ?)', [username, hash, full_name || '', email || '']);
        
        // Criar settings default
        await pool.query('INSERT INTO user_settings (user_id) VALUES (?)', [result.insertId]);

        return res.redirect('/?tab=login&success=Conta+criada!+Agora+faça+o+login.');
    } catch (err) {
        res.redirect('/?tab=register&error=Erro+interno.+Tente+novamente.');
    }
});

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../public/uploads');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// API endpoints protegidos
router.post('/items', requireAuth, upload.single('image'), async (req, res) => {
    const { id, name, category, price } = req.body;
    if (!name || name.trim() === '') return res.status(400).redirect('/menu');
    
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) return res.status(400).redirect('/menu');

    let imageUrl = req.file ? '/uploads/' + req.file.filename : null;

    try {
        if (id) {
            if (imageUrl) {
                await pool.query('UPDATE items SET name=?, category=?, price=?, image_url=? WHERE id=?', [name.trim(), category, priceNum, imageUrl, id]);
            } else {
                await pool.query('UPDATE items SET name=?, category=?, price=? WHERE id=?', [name.trim(), category, priceNum, id]);
            }
        } else {
            await pool.query('INSERT INTO items (name, category, price, image_url) VALUES (?, ?, ?, ?)', [name.trim(), category, priceNum, imageUrl]);
        }
        res.redirect('/menu');
    } catch (err) {
        res.status(500).redirect('/menu');
    }
});

router.delete('/items/:id', requireAuth, async (req, res) => {
    try {
        await pool.query('DELETE FROM items WHERE id=?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar.' });
    }
});

router.post('/orders', requireAuth, async (req, res) => {
    const { customer_name, items } = req.body; // expected items: [{id, quantity, notes}]

    if (!customer_name || !items || items.length === 0) {
        return res.status(400).json({ error: 'Dados inválidos.' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        let totalValue = 0;
        
        // Calcular valor total
        for (const item of items) {
            const [rows] = await connection.query('SELECT price FROM items WHERE id = ?', [item.id]);
            if (rows.length > 0) {
                totalValue += parseFloat(rows[0].price) * parseInt(item.quantity || 1);
            }
        }

        const [result] = await connection.query('INSERT INTO orders (customer_name, status, total_value) VALUES (?, ?, ?)', [customer_name.trim(), 'Aberto', totalValue]);
        const orderId = result.insertId;

        for (const item of items) {
            await connection.query('INSERT INTO order_items (order_id, item_id, quantity, notes) VALUES (?, ?, ?, ?)', [orderId, item.id, item.quantity || 1, item.notes || '']);
        }

        await connection.commit();
        res.status(201).json({ message: 'Pedido criado com sucesso.', orderId });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: 'Erro interno.' });
    } finally {
        connection.release();
    }
});

router.put('/orders/:id/status', requireAuth, async (req, res) => {
    const { status } = req.body;
    if (!['Aberto', 'Cozinha', 'Entrega', 'Entregue'].includes(status)) {
        return res.status(400).json({ error: 'Status inválido' });
    }
    try {
        await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Erro interno' });
    }
});

router.post('/settings', requireAuth, async (req, res) => {
    const theme = req.body.dark_mode === 'on' ? 'dark' : 'light';
    try {
        await pool.query('INSERT INTO user_settings (user_id, theme) VALUES (?, ?) ON DUPLICATE KEY UPDATE theme=?', [req.session.userId, theme, theme]);
        if(req.session.user.settings) {
            req.session.user.settings.theme = theme;
        } else {
            req.session.user.settings = { theme };
        }
        res.redirect('/settings');
    } catch (err) {
        res.status(500).send('Erro ao salvar configurações');
    }
});

router.post('/profile', requireAuth, async (req, res) => {
    const { full_name, password } = req.body;
    try {
        if(password && password.trim() !== '') {
            const hash = await hashPassword(password);
            await pool.query('UPDATE users SET full_name=?, password=? WHERE id=?', [full_name, hash, req.session.userId]);
        } else {
            await pool.query('UPDATE users SET full_name=? WHERE id=?', [full_name, req.session.userId]);
        }
        req.session.user.full_name = full_name;
        res.redirect('/profile');
    } catch (err) {
        res.status(500).send('Erro ao salvar perfil');
    }
});

router.get('/export/orders', requireAuth, async (req, res) => {
    try {
        const [orders] = await pool.query(`
            SELECT o.id, o.customer_name, o.status, o.total_value, o.created_at, GROUP_CONCAT(i.name SEPARATOR ', ') AS item_names
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN items i ON oi.item_id = i.id
            GROUP BY o.id
            ORDER BY o.id DESC
        `);

        let csvContent = 'ID,Cliente,Itens,Status,Valor Total (R$),Data\n';
        
        orders.forEach(o => {
            const items = `"${(o.item_names || '').replace(/"/g, '""')}"`;
            csvContent += `${o.id},"${o.customer_name}",${items},${o.status},${o.total_value},${o.created_at}\n`;
        });

        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="relatorio_${Date.now()}.csv"`);
        res.send('\ufeff' + csvContent);
    } catch (err) {
        res.status(500).send('Erro ao gerar relatório');
    }
});

module.exports = router;
