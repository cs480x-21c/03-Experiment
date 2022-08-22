require("dotenv").config();

const { Client, Pool } = require("pg");

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

// client.connect();

// client.query("SELECT * FROM public.results;", (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//         console.log(JSON.stringify(row));
//     }
//     client.end();
// });

module.exports = pool;