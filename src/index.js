const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const createError = require('http-errors');
const path = require('path');

const store = require('./store');

// defining the Express app
const app = express();

// shared values
// const API_STORE = '/v1/stores';
const API_STORE = '/';

// adding Helmet to enhance your API's security
app.use(helmet());

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

const port = process.env.PORT || 8080

// starting the server
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
