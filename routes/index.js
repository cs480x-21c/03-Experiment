var express = require("express");
var router = express.Router();

var fs = require("fs");

var title = "Cleveland-McGill Experiment";

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: title });
});

router.get("/survey", function(req, res, next) {
    res.render("survey", { title: title, numTrials: 60, currentTrial: 1 });
});

router.get("/done", function(req, res, next) {
    res.render("done", { title: title });
});

router.post("/submit", function(req, res, next) {
    let csv = req.body.id + "," + req.body.trial + "," + req.body.vis + "," + req.body.guess + "," + req.body.actual + "," + req.body.error + "\n";

    fs.existsSync("results.csv") || fs.writeFileSync("results.csv", "id,trial,vis,guess,actual,error\n");

    fs.appendFile("results.csv", csv, {encoding: "utf8"}, function(err) {
        if (err) {
            console.log(err);
        }
    });

    console.log(csv);

    res.json(req.body);
    //res.end();
});

module.exports = router;
