/* global describe, it, expect, beforeEach, beforeAll, jest */
/**
 * Testes unitários e de integração
 */
jest.mock('mysql2/promise');

const request = require('supertest');
const mysql2 = require('mysql2/promise');

// ----- Mocks de Banco de Dados -----
const mockConnectionQuery = jest.fn();
const mockConnection = {
  beginTransaction: jest.fn(),
  commit: jest.fn(),
  rollback: jest.fn(),
  release: jest.fn(),
  query: mockConnectionQuery,
};
const mockQuery = jest.fn();
const mockPool = {
  query: mockQuery,
  getConnection: jest.fn(),
};

mysql2.createPool.mockReturnValue(mockPool);

const { app } = require('./index');
const { hashPassword, verifyPassword } = require('./config/auth');

let agent;

beforeEach(() => {
  jest.clearAllMocks();
  
  mockQuery.mockResolvedValue([[], []]);
  mockConnectionQuery.mockResolvedValue([[], []]);

  mockPool.getConnection.mockResolvedValue(mockConnection);
  mockConnection.beginTransaction.mockResolvedValue();
  mockConnection.commit.mockResolvedValue();
  mockConnection.rollback.mockResolvedValue();
  mockConnection.release.mockImplementation(() => {});
  
  agent = request.agent(app); // Re-instancia o agent para limpar a sessão em cada teste
});

// =====================================================
// config/auth.js (Unit)
// =====================================================
describe('config/auth', () => {
  it('hashPassword deve retornar salt:hash', async () => {
    const result = await hashPassword('minhasenha');
    expect(result).toContain(':');
    const parts = result.split(':');
    expect(parts.length).toBe(2);
    expect(parts[0].length).toBeGreaterThan(0);
    expect(parts[1].length).toBeGreaterThan(0);
  });

  it('verifyPassword deve validar corretamente', async () => {
    const storedHash = await hashPassword('senhaCorreta');
    expect(await verifyPassword('senhaCorreta', storedHash)).toBe(true);
    expect(await verifyPassword('senhaErrada', storedHash)).toBe(false);
  });
});

// =====================================================
// Rotas Públicas (Sem Auth)
// =====================================================
describe('Rotas Públicas', () => {
  it('GET / deve renderizar login', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('login');
  });

  it('GET /login redireciona para /', async () => {
    const res = await request(app).get('/login');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/');
  });

  it('POST /api/register deve criar usuário e redirect para sucesso', async () => {
    mockQuery
      .mockResolvedValueOnce([[], []]) // Checa se existe
      .mockResolvedValueOnce([{ insertId: 1 }, []]) // Insere usuário
      .mockResolvedValueOnce([{}, []]); // Insere settings
    const res = await request(app).post('/api/register').send('username=novo&password=123');
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain('success=');
  });

  it('POST /api/register erro de username existente', async () => {
    mockQuery.mockResolvedValueOnce([[{ id: 1 }], []]);
    const res = await request(app).post('/api/register').send('username=novo&password=123');
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain('error=');
  });

  it('POST /api/login redireciona se erro', async () => {
    mockQuery.mockResolvedValueOnce([[], []]);
    const res = await request(app).post('/api/login').send('username=inexistente&password=123');
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain('error=');
  });
});

// =====================================================
// Helpers para Rotas Autenticadas
// =====================================================
async function loginAgent(customAgent) {
  const hash = await hashPassword('senhaCorreta');
  mockQuery.mockResolvedValueOnce([[{ id: 1, username: 'lucas', password: hash, full_name: 'Lucas', role: 'admin' }], []]);
  await customAgent.post('/api/login').send('username=lucas&password=senhaCorreta');
}

// =====================================================
// Rotas Autenticadas (Views)
// =====================================================
describe('Views Autenticadas', () => {
  it('GET /dashboard', async () => {
    await loginAgent(agent);
    mockQuery
      .mockResolvedValueOnce([[{ id: 1, name: 'Arroz' }], []])
      .mockResolvedValueOnce([[{ id: 1, customer_name: 'Maria', status: 'Aberto' }], []]);
    const res = await agent.get('/dashboard');
    if (res.status !== 200) console.log('DASHBOARD ERROR RESPONSE:', res.status, res.text);
    expect(res.status).toBe(200);
  });

  it('GET /kanban', async () => {
    await loginAgent(agent);
    mockQuery.mockResolvedValueOnce([[{ id: 1, customer_name: 'Maria', status: 'Aberto', item_names: 'Arroz' }], []]);
    const res = await agent.get('/kanban');
    expect(res.status).toBe(200);
  });

  it('GET /orders', async () => {
    await loginAgent(agent);
    mockQuery.mockResolvedValueOnce([[{ id: 1, customer_name: 'Maria', status: 'Aberto', item_names: 'Arroz' }], []]);
    const res = await agent.get('/orders');
    expect(res.status).toBe(200);
  });

  it('GET /orders/new', async () => {
    await loginAgent(agent);
    mockQuery.mockResolvedValueOnce([[{ id: 1, name: 'Arroz' }], []]);
    const res = await agent.get('/orders/new');
    expect(res.status).toBe(200);
  });

  it('GET /menu', async () => {
    await loginAgent(agent);
    mockQuery.mockResolvedValueOnce([[{ id: 1, name: 'Arroz' }], []]);
    const res = await agent.get('/menu');
    expect(res.status).toBe(200);
  });
  
  it('GET /reports, /settings, /profile', async () => {
    await loginAgent(agent);
    expect((await agent.get('/reports')).status).toBe(200);
    expect((await agent.get('/settings')).status).toBe(200);
    expect((await agent.get('/profile')).status).toBe(200);
  });

  it('GET /logout', async () => {
    await loginAgent(agent);
    const res = await agent.get('/logout');
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain('login');
  });
});

// =====================================================
// Rotas API (Autenticadas)
// =====================================================
describe('API Autenticada', () => {
  it('POST /api/items (Add Item)', async () => {
    await loginAgent(agent);
    mockQuery.mockResolvedValueOnce([{ insertId: 1 }, []]);
    const res = await agent.post('/api/items')
      .field('name', 'Feijão')
      .field('category', 'Grão')
      .field('price', '3.50');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/menu');
  });

  it('POST /api/items (Update Item)', async () => {
    await loginAgent(agent);
    mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }, []]);
    const res = await agent.post('/api/items')
      .field('id', '1')
      .field('name', 'Feijão Atualizado')
      .field('category', 'Grão')
      .field('price', '4.00');
    expect(res.status).toBe(302);
  });

  it('DELETE /api/items/:id', async () => {
    await loginAgent(agent);
    mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }, []]);
    const res = await agent.delete('/api/items/1');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('POST /api/orders', async () => {
    await loginAgent(agent);
    mockConnectionQuery
      .mockResolvedValueOnce([[{ price: 10 }], []]) // query de preço do item 1
      .mockResolvedValueOnce([{ insertId: 42 }, []]) // insert order
      .mockResolvedValueOnce([{}, []]); // insert order_items

    const res = await agent.post('/api/orders').send({
      customer_name: 'João',
      items: [{ id: 1, quantity: 2, notes: '' }]
    });
    
    expect(res.status).toBe(201);
    expect(res.body.orderId).toBe(42);
  });

  it('PUT /api/orders/:id/status', async () => {
    await loginAgent(agent);
    mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }, []]);
    const res = await agent.put('/api/orders/1/status').send({ status: 'Cozinha' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('POST /api/settings', async () => {
    await loginAgent(agent);
    mockQuery.mockResolvedValueOnce([{}, []]);
    const res = await agent.post('/api/settings').send('dark_mode=on');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/settings');
  });

  it('POST /api/profile', async () => {
    await loginAgent(agent);
    mockQuery.mockResolvedValueOnce([{}, []]);
    const res = await agent.post('/api/profile').send('full_name=Lucas Alterado');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/profile');
  });

  it('GET /api/export/orders', async () => {
    await loginAgent(agent);
    mockQuery.mockResolvedValueOnce([[
      { id: 1, customer_name: 'Teste', status: 'Aberto', total_value: 10, created_at: new Date(), item_names: 'Arroz' }
    ], []]);
    const res = await agent.get('/api/export/orders');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/csv');
  });
});
