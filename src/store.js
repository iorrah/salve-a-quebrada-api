const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const utils = require('./utils/utils');

const adapter = new FileSync('db.json');
const db = low(adapter);

const getStores = () => {
  const stores = db.defaults(utils.defaultDb).get('stores').value();
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
    const store = utils.buildStore(req.body, id);
    db.get('stores').push(store).write();
    res.send(store);
    res.end(store);
  }
};

module.exports = store;
