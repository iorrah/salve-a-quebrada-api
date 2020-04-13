const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const createError = require('http-errors');
const path = require('path');

const store = require('./store');

// defining the Express app
const app = express();

// shared values
const API_STORE = '/v1/stores';

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
// app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

// defining an endpoint to return all stores
app.get(API_STORE, store.get);

// defining an endpoint to add a new store
app.post(API_STORE, store.post);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.use(function (req, res, next) {
//     // console.log(req);
//     // console.log('hello world');
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });

// starting the server
app.listen(8080, () => {
  console.log('Listening on port 8080');
});
