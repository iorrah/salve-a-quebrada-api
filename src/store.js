const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const store = {
  get(req, res) {
    const stores = db.get('stores').value();
    res.send(stores);
  },

  post(req, res) {
    const id = 123; // latest id incremented

    const store = {
      city: req.body.city,
      donation: req.body.donation,
      id: id,
      image: req.body.imageText,
      name: req.body.name,
      status: 0,
    };

    db.get('stores').push(store).write();

    console.log(JSON.stringify(req.body));

    // const stores = db.get('stores').value();
    res.send(store);
    res.end('Hello World');
  }
};

module.exports = store;
