const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const utils = require('./utils/utils');

const adapter = new FileSync('db.json');
const db = low(adapter);

const getStoresReference = () => {
  const reference = db.defaults(utils.defaultDb).get('stores');
  return reference;
};

const getAllStores = () => {
  const stores = getStoresReference().value();
  return stores;
};

const getValidStores = () => {
  const stores = getStoresReference().filter({ status: 1 }).value();
  return stores;
};

const store = {
  get(req, res) {
    const stores = getValidStores();
    res.send(stores);
  },

  post(req, res) {
    const stores = getAllStores();
    const id = utils.getNewStoreId(stores);
    const store = utils.buildStore(req.body, id);
    db.get('stores').push(store).write();
    res.send();
    res.end();
  }
};

module.exports = store;
