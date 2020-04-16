const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const utils = require('./utils/utils');

const adapter = new FileSync('db.json');
const db = low(adapter);

const defaultDb = {
  stores: [],
};

const getStores = () => {
  const stores = db.defaults(defaultDb).get('stores').value();
  return stores;
};

const store = {
  get(req, res) {
    const stores = getStores();
    res.send(stores);
  },

  post(req, res) {
    const stores = getStores();
    const id = utils.getNewStoreId(stores);

    const store = {
      address: req.body.address,
      donation: req.body.donation,
      id: id,
      image: req.body.image,
      name: req.body.name,
      status: 0,
    };

    db.get('stores').push(store).write();
    res.send(store);
    res.end(store);
  }
};

module.exports = store;
