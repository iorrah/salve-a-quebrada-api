const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const utils = require('./utils/utils');

const adapter = new FileSync('db.json');
const db = low(adapter);

const store = {
  get(req, res) {
    const stores = db.get('stores').value();
    res.send(stores);
  },

  post(req, res) {
    const stores = db.get('stores').value();
    const id = utils.getId(stores);

    const store = {
      city: req.body.city,
      donation: req.body.donation,
      id: id,
      image: req.body.imageText,
      name: req.body.name,
      status: 0,
    };

    db.get('stores').push(store).write();
    res.send(store);
    res.end(store);
  }
};

module.exports = store;
