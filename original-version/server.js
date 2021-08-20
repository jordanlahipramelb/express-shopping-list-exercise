const app = require('./app');

// To ensure we don’t start the server when we import our app variable in our tests, we’re going to move out our app.listen code into a file called server.js

app.listen(3000, function () {
  console.log('Server starting on port 3000');
});
