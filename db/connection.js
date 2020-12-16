const MongoClient = require('mongodb').MongoClient;
const { addSafeReadOnlyGlobal } = require('../utils/utils');

module.exports = new (class Connection {
  constructor() {
    this.mongoUrl = process.env.MONGO_URL;
    this.mongoDbName = process.env.MONGO_DB_NAME;
    this.connect();
  }

  async connect() {
    const that = this;
    if (!this.mongoUrl) throw new Error('Can not connect without a mongo url!');
    MongoClient.connect(this.mongoUrl, async function(err, client) {
      if (err) throw new Error('Can not connect to mongo url!', that.mongoUrl);
      let db = client.db(that.mongoDbName);
      addSafeReadOnlyGlobal('db', db);
    });
  }
})();
