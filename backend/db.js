const Pool= require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password:"postgres123",
    host:"localhost",
    port:5432,
    database:"systra"
});

module.exports =pool;