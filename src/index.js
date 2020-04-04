const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const store = require('./store');

// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const stores = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all stores
app.get('/v1/stores', store.get);

// defining an endpoint to add a new store
app.post('/v1/stores', store.post);

// starting the server
app.listen(8080, () => {
  console.log('listening on port 8080');
});
