const { Pool } = require('pg');
const {config} = require('dotenv');

config()

/*const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'proyectoWeb',
    port: '5432'
});*/

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
})
  
module.exports = pool;