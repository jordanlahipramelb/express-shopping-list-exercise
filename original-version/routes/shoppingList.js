const express = require('express');
const ExpressError = require('../expressError');
const shoppingList = require('../fakeDb');
const router = new express.Router();

// GET Route: All items in shooping list
router.get('/', (req, res) => res.json({ shoppingList }));

// GET Route: Single item in shopping list
router.get('/:name', (req, res) => {
  const foundItem = shoppingList.find((item) => item.name === req.params.name);

  if (foundItem === undefined) {
    throw new ExpressError('Item not found.', 404);
  }

  res.json({ shoppingList: foundItem });
});

// POST Route
router.post('/', function (req, res, next) {
  try {
    if (!req.body.name) throw new ExpressError('Name is required', 400);
    let newItem = { name: req.body.name, price: req.body.price };
    shoppingList.push(newItem);

    return res.status(201).json({ shoppingList: newItem });
  } catch (err) {
    return next(err);
  }
});

// PATCH Route
router.patch('/:name', function (req, res) {
  const foundItem = shoppingList.find((item) => item.name === req.params.name);

  if (foundItem === undefined) {
    throw new ExpressError('Item not found.', 404);
  }

  foundItem.name = req.body.name;
  foundItem.price = req.body.price;
  res.json({ shoppingList: foundItem });
});

// DELETE Route
router.delete('/:name', function (req, res) {
  const foundItem = shoppingList.find((item) => item.name === req.params.name);

  if (foundItem === -1) {
    throw new ExpressError('Item not found.', 404);
  }

  foundItem.splice(foundItem, 1);
  res.json({ message: 'Deleted' });
});

module.exports = router;
