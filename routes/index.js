var express = require("express");
var router = express.Router();

var fs = require("fs");
var pool = require("../utils/db");

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index");
});

router.get("/survey", function(req, res, next) {
    res.render("survey", { numTrials: 60, currentTrial: 1 });
});

router.get("/done", function(req, res, next) {
    res.render("done");
});

router.post("/submit", function(req, res, next) {
    let csv = req.body.id + "," + req.body.trial + "," + req.body.vis + "," + req.body.guess + "," + req.body.actual + "," + req.body.error + "\n";
    fs.existsSync("results.csv") || fs.writeFileSync("results.csv", "id,trial,vis,guess,actual,error\n");
    fs.appendFile("results.csv", csv, {encoding: "utf8"}, function(err) {
        if (err) {
            console.log(err);
        }
    });

    pool.query(
        "INSERT INTO results (id, trial, vis, guess, actual, error) VALUES ($1, $2, $3, $4, $5, $6)", 
         [req.body.id, req.body.trial, req.body.vis, req.body.guess, req.body.actual, req.body.error],
         (err, res) => {
            if (err) {
                console.log(err);
            }
        }
    )

    res.json(req.body);
    //res.end();
});

module.exports = router;