/**
 * Testes unitários e de integração — index.js
 * Cobre: hashPassword, verifyPassword e todas as rotas HTTP
 */

// Mock do mysql2/promise ANTES de qualquer require
jest.mock('mysql2/promise');

const request = require('supertest');
const mysql2 = require('mysql2/promise');

// ----- Configuração dos mocks de banco de dados -----
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

// Configura createPool ANTES de require('../index')
mysql2.createPool.mockReturnValue(mockPool);

// Agora importa o módulo — pool será definido via mock
const { app, hashPassword, verifyPassword } = require('./index');

// ----- Restaura defaults antes de cada teste -----
beforeEach(() => {
  jest.clearAllMocks();
  mockPool.getConnection.mockResolvedValue(mockConnection);
  mockConnection.beginTransaction.mockResolvedValue();
  mockConnection.commit.mockResolvedValue();
  mockConnection.rollback.mockResolvedValue();
  mockConnection.release.mockImplementation(() => {});
});

// =====================================================
// hashPassword
// =====================================================
describe('hashPassword', () => {
  it('deve retornar uma string no formato salt:hash', async () => {
    const result = await hashPassword('minhasenha');
    expect(typeof result).toBe('string');
    expect(result).toContain(':');
    const parts = result.split(':');
    expect(parts.length).toBe(2);
    expect(parts[0].length).toBeGreaterThan(0); // salt
    expect(parts[1].length).toBeGreaterThan(0); // hash
  });

  it('deve gerar hashes diferentes para a mesma senha (salt aleatório)', async () => {
    const hash1 = await hashPassword('senha123');
    const hash2 = await hashPassword('senha123');
    expect(hash1).not.toBe(hash2);
  });
});

// =====================================================
// verifyPassword
// =====================================================
describe('verifyPassword', () => {
  let storedHash;

  beforeAll(async () => {
    storedHash = await hashPassword('senhaCorreta');
  });

  it('deve retornar true para a senha correta', async () => {
    const result = await verifyPassword('senhaCorreta', storedHash);
    expect(result).toBe(true);
  });

  it('deve retornar false para senha errada', async () => {
    const result = await verifyPassword('senhaErrada', storedHash);
    expect(result).toBe(false);
  });
});

// =====================================================
// GET /
// =====================================================
describe('GET /', () => {
  it('deve renderizar a página de login com tab padrão', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('MarmitaTech');
  });

  it('deve passar parâmetro tab personalizado', async () => {
    const res = await request(app).get('/?tab=register');
    expect(res.status).toBe(200);
  });

  it('deve passar parâmetros error e success', async () => {
    const res = await request(app).get('/?error=Erro+teste&success=OK');
    expect(res.status).toBe(200);
  });
});

// =====================================================
// GET /logout
// =====================================================
describe('GET /logout', () => {
  it('deve redirecionar para a página de login', async () => {
    const res = await request(app).get('/logout');
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain('tab=login');
  });
});

// =====================================================
// POST /login
// =====================================================
describe('POST /login', () => {
  it('deve redirecionar com erro se usuário não encontrado', async () => {
    mockQuery.mockResolvedValueOnce([[], []]);
    const res = await request(app)
      .post('/login')
      .send('username=inexistente&password=123456');
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain('error=');
  });

  it('deve redirecionar para /dashboard com credenciais corretas', async () => {
    const hash = await hashPassword('senhavalida');
    mockQuery.mockResolvedValueOnce([[{ id: 1, username: 'lucas', password: hash }], []]);
    const res = await request(app)
      .post('/login')
      .send('username=lucas&password=senhavalida');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/dashboard');
  });

  it('deve redirecionar com erro se senha errada', async () => {
    const hash = await hashPassword('senhaCorreta');
    mockQuery.mockResolvedValueOnce([[{ id: 1, username: 'lucas', password: hash }], []]);
    const res = await request(app)
      .post('/login')
      .send('username=lucas&password=senhaErrada');
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain('error=');
  });

  it('deve redirecionar com erro em caso de falha no banco', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));
    const res = await request(app)
      .post('/login')
      .send('username=lucas&password=123456');
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain('error=');
  });
});

// =====================================================
// POST /register
// =====================================================
describe('POST /register', () => {
  it('deve redirecionar com erro se username estiver vazio', async () => {
    const res = await request(app)
      .post('/register')
      .send('username=&password=123456');
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain('error=');
  });

  it('deve redirecionar com erro se password estiver vazio', async () => {
    const res = await request(app)
      .post('/register')
      .send('username=lucas&password=');
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain('error=');
  });

  it('deve redirecionar com erro se usuário já existe', async () => {
    mockQuery.mockResolvedValueOnce([[{ id: 1 }], []]);
    const res = await request(app)
      .post('/register')
      .send('username=lucas&password=123456');
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain('error=');
  });

  it('deve criar usuário e redirecionar para login', async () => {
    mockQuery
      .mockResolvedValueOnce([[], []])       // SELECT: sem usuário existente
      .mockResolvedValueOnce([{ insertId: 1 }, []]); // INSERT
    const res = await request(app)
      .post('/register')
      .send('username=novousuario&password=senha123');
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain('success=');
  });

  it('deve redirecionar com erro em caso de falha no banco', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));
    const res = await request(app)
      .post('/register')
      .send('username=usuario&password=senha123');
    expect(res.status).toBe(302);
    expect(res.headers.location).toContain('error=');
  });
});

// =====================================================
// GET /dashboard
// =====================================================
describe('GET /dashboard', () => {
  it('deve renderizar o dashboard com itens e pedidos', async () => {
    mockQuery
      .mockResolvedValueOnce([[{ id: 1, name: 'Arroz', category: 'Base', price: 5.00 }], []])
      .mockResolvedValueOnce([[{ id: 1, customer_name: 'Cliente', status: 'Aberto', item_names: 'Arroz' }], []]);
    const res = await request(app).get('/dashboard');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Dashboard');
  });
});

// =====================================================
// POST /add-item
// =====================================================
describe('POST /add-item', () => {
  it('deve retornar 400 se o nome estiver vazio', async () => {
    const res = await request(app)
      .post('/add-item')
      .send('name=&category=Base&price=5.00');
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Nome');
  });

  it('deve retornar 400 se o nome for só espaços', async () => {
    const res = await request(app)
      .post('/add-item')
      .send('name=   &category=Base&price=5.00');
    expect(res.status).toBe(400);
  });

  it('deve retornar 400 se o preço for inválido (texto)', async () => {
    const res = await request(app)
      .post('/add-item')
      .send('name=Arroz&category=Base&price=abc');
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Preço');
  });

  it('deve retornar 400 se o preço for zero ou negativo', async () => {
    const res = await request(app)
      .post('/add-item')
      .send('name=Arroz&category=Base&price=-1');
    expect(res.status).toBe(400);
  });

  it('deve criar item e retornar 201', async () => {
    mockQuery.mockResolvedValueOnce([{ insertId: 1 }, []]);
    const res = await request(app)
      .post('/add-item')
      .send('name=Feijão&category=Grão&price=3.50');
    expect(res.status).toBe(201);
    expect(res.body.message).toContain('sucesso');
  });

  it('deve retornar 500 em caso de erro no banco', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));
    const res = await request(app)
      .post('/add-item')
      .send('name=Arroz&category=Base&price=5.00');
    expect(res.status).toBe(500);
  });
});

// =====================================================
// POST /orders
// =====================================================
describe('POST /orders', () => {
  it('deve retornar 400 se customer_name estiver vazio', async () => {
    const res = await request(app)
      .post('/orders')
      .send('customer_name=&item_ids[]=1');
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('deve retornar 400 se item_ids estiver ausente', async () => {
    const res = await request(app)
      .post('/orders')
      .send('customer_name=Cliente');
    expect(res.status).toBe(400);
  });

  it('deve criar pedido com múltiplos itens e retornar 201', async () => {
    mockConnectionQuery
      .mockResolvedValueOnce([{ insertId: 42 }, []])  // INSERT orders
      .mockResolvedValueOnce([{}, []])                  // INSERT order_items item 1
      .mockResolvedValueOnce([{}, []]);                 // INSERT order_items item 2
    const res = await request(app)
      .post('/orders')
      .send('customer_name=João&item_ids[]=1&item_ids[]=2');
    expect(res.status).toBe(201);
    expect(res.body.message).toContain('sucesso');
  });

  it('deve retornar 500 e fazer rollback em caso de erro', async () => {
    mockConnectionQuery.mockRejectedValueOnce(new Error('DB error'));
    const res = await request(app)
      .post('/orders')
      .send('customer_name=Cliente&item_ids[]=1');
    expect(res.status).toBe(500);
    expect(mockConnection.rollback).toHaveBeenCalled();
    expect(mockConnection.release).toHaveBeenCalled();
  });
});

// =====================================================
// GET /kanban
// =====================================================
describe('GET /kanban', () => {
  it('deve renderizar o kanban com pedidos', async () => {
    mockQuery.mockResolvedValueOnce([[
      { id: 1, customer_name: 'Maria', status: 'Cozinha', item_names: 'Arroz, Feijão' }
    ], []]);
    const res = await request(app).get('/kanban');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Kanban');
  });

  it('deve retornar 500 em caso de erro no banco', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));
    const res = await request(app).get('/kanban');
    expect(res.status).toBe(500);
  });
});

// =====================================================
// PUT /orders/:id/status
// =====================================================
describe('PUT /orders/:id/status', () => {
  it('deve retornar 400 para status inválido', async () => {
    const res = await request(app)
      .put('/orders/1/status')
      .send('status=Cancelado');
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('inválido');
  });

  it('deve atualizar status e retornar 200', async () => {
    mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }, []]);
    const res = await request(app)
      .put('/orders/1/status')
      .send('status=Cozinha');
    expect(res.status).toBe(200);
    expect(res.body.message).toContain('sucesso');
  });

  it('deve retornar 500 em caso de erro no banco', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));
    const res = await request(app)
      .put('/orders/1/status')
      .send('status=Entrega');
    expect(res.status).toBe(500);
  });

  it('deve aceitar todos os status válidos', async () => {
    const validStatuses = ['Aberto', 'Cozinha', 'Entrega', 'Entregue'];
    for (const status of validStatuses) {
      mockQuery.mockResolvedValueOnce([{ affectedRows: 1 }, []]);
      const res = await request(app)
        .put('/orders/1/status')
        .send(`status=${status}`);
      expect(res.status).toBe(200);
    }
  });
});

// =====================================================
// GET /admin/export
// =====================================================
describe('GET /admin/export', () => {
  it('deve retornar um CSV com os pedidos', async () => {
    mockQuery.mockResolvedValueOnce([[
      {
        id: 1,
        customer_name: 'João "Silva"',
        status: 'Entregue',
        item_names: 'Arroz, Feijão',
        total_value: 8.50
      }
    ], []]);
    const res = await request(app).get('/admin/export');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/csv');
    expect(res.text).toContain('ID,Cliente');
    expect(res.text).toContain('Entregue');
  });

  it('deve lidar com lista de pedidos vazia', async () => {
    mockQuery.mockResolvedValueOnce([[], []]);
    const res = await request(app).get('/admin/export');
    expect(res.status).toBe(200);
    expect(res.text).toContain('ID,Cliente');
  });

  it('deve retornar 500 em caso de erro no banco', async () => {
    mockQuery.mockRejectedValueOnce(new Error('DB error'));
    const res = await request(app).get('/admin/export');
    expect(res.status).toBe(500);
  });
});
