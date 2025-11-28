// src/infrastructure/database/database.factory.js
const dbType = process.env.DB_TYPE || 'nosql';

if (dbType === 'nosql') {
  require('./nosql/mongoose.config').connect();
}

const repos = dbType === 'nosql' ? {

} : {
    //sql
};

module.exports = repos;