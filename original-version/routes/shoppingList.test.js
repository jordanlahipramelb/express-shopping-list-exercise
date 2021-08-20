process.env.NODE_ENV = 'test'; // set an environment variable
const request = require('supertest'); //install supertest and import it
const app = require('../app'); // import your actual app
let shoppingList = require('../fakeDb'); //empty array; fake DB

let item = { name: 'popsicle', price: 1.5 }; // setup a test variable

beforeEach(function () {
  shoppingList.push(item);
});

afterEach(function () {
  shoppingList.length = 0;
});

//  GET data on all items
describe('GET /shoppinglist', () => {
  test('Get all items on shopping list', async () => {
    const res = await request(app).get('/shoppinglist');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ shoppingList: [item] });
  });
});

// GET data on one item
describe('GET /shoppinglist/:name', () => {
  test('Get /shoppinglist/:name', async () => {
    const res = await request(app).get(`/shoppinglist/${item.name}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ shoppingList: item });
  });

  test('Respond with 404 for nonexistent item.', async () => {
    const res = await request(app).get(`/shoppinglist/run`);

    expect(res.statusCode).toBe(404);
  });
});

// POST data of new item
describe('POST /shoppinglist', () => {
  test('Creating an item.', async () => {
    const res = await request(app)
      .post('/shoppinglist')
      .send({ name: 'beer', price: 12 });

    expect(res.statusCode).toBe(201);

    expect(res.body).toEqual({ shoppingList: { name: 'beer', price: 12 } });
  });

  test('Responds with 400 if item is missing', async () => {
    const res = await request(app).post('/shoppinglist').send({});

    expect(res.statusCode).toBe(400);
  });
});

// PATCH/UPDATE item
describe('PATCH /shoppinglist', () => {
  test('Update item name.', async () => {
    const res = await request(app)
      .patch(`/shoppinglist/${item.name}`)
      .send({ name: 'alcohol' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ shoppingList: { name: 'alcohol' } });
  });

  test('Responds with 400 if item is missing', async () => {
    const res = await request(app).post('/shoppinglist').send({});

    expect(res.statusCode).toBe(400);
  });
});
