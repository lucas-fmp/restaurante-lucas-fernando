const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const { requireAuth, hashPassword, verifyPassword } = require('../config/auth');

// Auth routes
router.get('/', (req, res) => {
    if (req.session.userId) return res.redirect('/dashboard');
    const { tab, error, success } = req.query;
    res.render('login', { layout: 'layouts/auth', tab: tab || 'login', error: error || null, success: success || null });
});

router.get('/login', (req, res) => {
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/?tab=login&success=Desconectado+com+sucesso!');
});

// Dashboard
router.get('/dashboard', requireAuth, async (req, res) => {
    try {
        const [items] = await pool.query('SELECT * FROM items');
        const [orders] = await pool.query(`
            SELECT o.id, o.customer_name, o.status, GROUP_CONCAT(i.name SEPARATOR ', ') AS item_names, o.total_value, o.created_at
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN items i ON oi.item_id = i.id
            GROUP BY o.id
            ORDER BY o.id DESC
        `);
        res.render('dashboard', { items, orders });
    } catch (err) {
        console.error('DASHBOARD ERROR:', err);
        res.status(500).send('Erro ao carregar dashboard');
    }
});

// Kanban
router.get('/kanban', requireAuth, async (req, res) => {
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
        console.error('KANBAN ERROR:', err);
        res.status(500).send('Erro ao carregar painel Kanban');
    }
});

// Outras páginas
router.get('/orders', requireAuth, async (req, res) => {
    try {
        const [orders] = await pool.query(`
            SELECT o.id, o.customer_name, o.status, o.total_value, o.created_at, GROUP_CONCAT(i.name SEPARATOR ', ') AS item_names, COUNT(oi.id) as items_count
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            LEFT JOIN items i ON oi.item_id = i.id
            GROUP BY o.id
            ORDER BY o.id DESC
        `);
        res.render('orders', { orders });
    } catch (err) {
        console.error('ORDERS ERROR:', err);
        res.status(500).send('Erro ao carregar pedidos');
    }
});

router.get('/orders/new', requireAuth, async (req, res) => {
    try {
        const [items] = await pool.query('SELECT * FROM items');
        res.render('new_order', { items });
    } catch (err) {
        res.status(500).send('Erro ao carregar itens');
    }
});

router.get('/menu', requireAuth, async (req, res) => {
    try {
        const [items] = await pool.query('SELECT * FROM items');
        res.render('menu', { items });
    } catch (err) {
        res.status(500).send('Erro ao carregar cardápio');
    }
});


router.get('/reports', requireAuth, (req, res) => res.render('reports'));
router.get('/settings', requireAuth, (req, res) => res.render('settings'));
router.get('/profile', requireAuth, (req, res) => res.render('profile'));

module.exports = router;
