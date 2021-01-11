const MemoryDatabaseServer = require("../app/lib/MemoryDatabaseServer");

module.exports = async () => {
  await MemoryDatabaseServer.stop();
};
