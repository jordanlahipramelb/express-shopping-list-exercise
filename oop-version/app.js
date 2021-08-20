const express = require('express');
const app = express();
const shoppingListRoutes = require('./routes/shoppingList');
const ExpressError = require('./expressError');

app.use(express.json());

// Prefix routes with this route
app.use('/shoppinglist', shoppingListRoutes);

// 404 Handler
// If no other route matches, respond with a 404
// will only run if NO OTHER routes above match.
app.use(function (req, res, next) {
  return new ExpressError('Page Not Found', 404);
});

// General Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

module.exports = app;
