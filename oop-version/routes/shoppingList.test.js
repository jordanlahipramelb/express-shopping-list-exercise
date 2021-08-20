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
