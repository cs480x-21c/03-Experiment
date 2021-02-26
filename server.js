// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");
let d3 = require("d3");
const path = require('path');

const app = express();
let jsonParser = bodyParser.json();

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) =>
{
    response.sendFile(__dirname + "/views/home.html");
});

// make all the files in 'results' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// listen for requests :)
const listener = app.listen(process.env.PORT, () =>
{
    console.log("Your app is listening on port " + listener.address().port);
});

// URL for starting the experiment, user clicks the start button
app.get('/startExperiment', (request, response) =>
{
    console.log("Start Experiment");
    response.sendFile(path.join(__dirname + '/views/index.html'));
});

// URL for ending the experiment, user finnishes the survey
app.get('/endExperiment', (request, response) =>
{
    console.log("End Experiment");
    response.sendFile(path.join(__dirname + '/views/end.html'));
});

// Saves a result in a specified file
app.post('/result', jsonParser, (request, response) =>
{
    // Convert the results to csv format
    let result = request.body.children;
    let resultArray = result.map(function(d, i)
    {
        return [d.resultIndex, d.trialIndex, d.chartType, d.correctAnswer, d.participantAnswer];
    });

    let resultCSV = d3.csvFormatRows(resultArray) + "\n";

    fs.appendFile("results/r.csv", resultCSV, function (err)
    {
        if (err)
        {
            return console.log(err);
        }
        else
        {
            console.log("result recorded");
        }
    });

    response.json("result recorded");
});

// Gets a new index for the result file, the new one is the latest index + 1
app.post('/resultIndex', async (request, response) =>
{
    // Read the master csv to get a new result index
    fs.readFile("results/r.csv", "utf8", (err, file) =>
    {
        // If the directory cannot be scanned
        if (err)
        {
            return console.log("Unable to read file: " + err);
        }
        else
        {
            let data = d3.csvParse(file);
            let resultIndex = 0;

            try
            {
                // Gets the last row's result index and adds 1, this will make
                //  the next result index, since they are in order
                resultIndex = parseInt(data[data.length - 1].Result) + 1;
            }
            catch (e)
            {
                // If there are no entries, just leave result index at 0
            }

            // give the file the new result index
            response.json(resultIndex);
        }
    });
});
