const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'proyectoWeb',
    port: '5432'
});
  
module.exports = pool;