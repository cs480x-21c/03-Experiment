const express = require('express')
const bodyParser = require("body-parser");
const fs = require('fs')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
console.log(process.env.DATABASE_URL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? true : false
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/test', (req, res) => res.render('pages/test'))
  .post('/saveResults', async function (req, res) {
    fs.writeFileSync("results.csv", req.body.data+"\n", 'utf8')
    console.log("le file?? "+fs.readFileSync("results.csv", "utf8"));
    /*
    try {

      dbInsert = 'INSERT INTO results VALUES('+req.body.data+')'
      console.log(dbInsert)
      const client = await pool.connect();
      const result = await client.query(dbInsert);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
    */
  })
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM results');
      const results = { 'results': (result) ? result.rows : null };
      res.render('pages/db', results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

