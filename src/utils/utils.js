module.exports = {
  defaultDb: {
    stores: [],
  },

  getLatestId(stores) {
    if (stores && stores.length) {
      const { length } = stores;
      const latestStore = stores[length - 1];
      return latestStore.id;
    }

    return 0;
  },

  getNewStoreId(stores) {
    return this.getLatestId(stores) + 1;
  },

  buildStore(source, id) {
    return {
      address: source.address,
      donation: source.donation,
      id: id,
      image: source.image,
      name: source.name,
      status: 0,
    };
  },
};
