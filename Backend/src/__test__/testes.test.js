const request = require('supertest');
const app = require('../app');
const db = require('../db');

afterAll(async () => {
  await db.end();
});

describe('CRUD real com banco', () => {
  test('POST /usuarios deve criar um usuário', async () => {
    const res = await request(app).post('/cadastroLivros').send({ 
      titulo:"Vou ser deletado",
      autor:"Testador",
      editora:"Teste Ja",
      genero:"Testes"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.titulo).toBe('Vou ser deletado');
    expect(res.body.autor).toBe('Testador');
    expect(res.body.editora).toBe('Teste Ja');
    expect(res.body.genero).toBe('Testes');
    expect(res.body).toHaveProperty('id');
  });

 /* test('GET /usuarios deve listar usuários', async () => {
    await request(app).post('/usuarios').send({ nome: 'Arthur' });
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('PUT /usuarios/:id deve atualizar', async () => {
    const user = await request(app).post('/usuarios').send({ nome: 'Arthur' });
    const res = await request(app).put(`/usuarios/${user.body.id}`).send({ nome: 'Catarino' });
    expect(res.body.nome).toBe('Catarino');
  }/;

  test('DELETE /usuarios/:id deve deletar', async () => {
    const user = await request(app).post('/usuarios').send({ nome: 'Arthur' });
    const res = await request(app).delete(`/usuarios/${user.body.id}`);
    expect(res.statusCode).toBe(204);
  });*/
});
