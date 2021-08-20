const shoppingList = require('./fakeDb');
const ExpressError = require('./expressError');

class Item {
  constructor(name, price) {
    this.name;
    this.price;

    // POST
    shoppingList.push(this);
  }

  static getAllItems() {
    return shoppingList;
  }

  //   PATCH
  static updateItem(name, data) {
    let foundItem = findItem(name);

    if (foundItem === undefined) {
      throw new ExpressError('Page Not Found', 404);
    }

    foundItem.name = req.body.name;
    foundItem.splice(foundItem, 1);
    foundItem.price = req.body.price;

    return foundItem;
  }

  //   GET
  static findItem(name) {
    const foundItem = shoppingList.find((item) => item.name === name);

    if (foundItem === undefined) {
      throw { message: 'Item Not Found', status: 404 };
    }

    return foundItem;
  }

  //   DELETE
  static removeItem(name) {
    const foundItem = shoppingList.find((item) => item.name === name);

    if (foundItem === -1) {
      throw ('Item not found.', 404);
    }

    foundItem.splice(foundItem, 1);
  }
}

module.exports = Item;
