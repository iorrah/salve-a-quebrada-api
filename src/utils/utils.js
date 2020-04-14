module.exports = {
  getLatestId(stores) {
    if (stores && stores.length) {
      const { length } = stores;
      return length;
    }

    return 0;
  },

  getId(stores) {
    return this.getLatestId(stores) + 1;
  }
};
