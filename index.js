require('dotenv').config();
const { connect } = require('./src/infrastructure/database/nosql/mongoose_config');

(async () => {
  await connect();
})();
