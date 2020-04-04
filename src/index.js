const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const store = require('./store');

// defining the Express app
const app = express();

// shared values
const API_STORE = '/v1/stores';

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all stores
app.get(API_STORE, store.get);

// defining an endpoint to add a new store
app.post(API_STORE, store.post);

// starting the server
app.listen(8080, () => {
  console.log('Listening on port 8080');
});
