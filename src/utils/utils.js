module.exports = {
  defaultDb: {
    stores: [],
  },

  getLatestId(stores) {
    if (stores && stores.length) {
      const { length } = stores;
      return length;
    }

    return 0;
  },

  getNewStoreId(stores) {
    return this.getLatestId(stores) + 1;
  }
};
