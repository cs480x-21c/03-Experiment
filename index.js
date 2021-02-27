const express = require('express')
const bodyParser = require("body-parser");
const fs = require('fs')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

let participantIndex = null;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/test', (req, res) => res.render('pages/test'))
  .post('/saveResults', async function (req, res) {
    fs.appendFileSync("results.csv", req.body.data, 'utf8')
    let i = req.body.question;
    //console.log("participant: "+req.body.participant)

    if (req.body.participant == null || req.body.participant == "") {
      try {
        const client = await pool.connect();
        let participants = await client.query('SELECT participant FROM results');

        participantIndex = participants.rowCount + 1;

        if (isNaN(participantIndex)){
          participantIndex = 0;
        }

        dbInsert = 'INSERT INTO "results"(participant, order' + i + ', greater' + i + ', percent' + i + ') VALUES(' + participantIndex + ', ' + req.body.data + ');'
        //console.log(dbInsert)

        const result = await client.query(dbInsert);
        client.release();
        res.send(""+participantIndex)
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
    } else {
      try {
        dbInsert = 'UPDATE "results" SET "order' + i + '" = ' + req.body.order + ', "greater' + i + '" = ' + req.body.greater + ', "percent' + i + '" = ' + req.body.percent + ' WHERE participant = '+participantIndex+';';

        //'UPDATE "results" SET chart'+i+'='+i+', greater'+i+'='+req.body.greater+', percent'+i+'='+req.body.percent+')'
        // tried to use column list format but it didn't work so now I'm here
        // 'UPDATE "results" SET (order'+i+', greater'+i+', percent'+i+') = ('+req.body.data+') WHERE participant = '+participantIndex+';'
        //console.log(dbInsert)
        const client = await pool.connect();
        const result = await client.query(dbInsert);
        client.release();
        res.send(""+participantIndex)
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
    }

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

