const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const store = {
  get(req, res) {
    const stores = db.get('stores').value();
    res.send(stores);
  }

  post(req, res) {
    db.get('posts').push(req).write();
    
    const stores = db.get('stores').value();
    res.send(stores);
  }
};

module.exports = store;
