// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");
let d3 = require("d3");
const app = express();
let jsonParser = bodyParser.json();

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) =>
{
    response.sendFile(__dirname + "/views/index.html");
});


// make all the files in 'results' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("scripts"));

// listen for requests :)
const listener = app.listen(process.env.PORT, () =>
{
    console.log("Your app is listening on port " + listener.address().port);
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
    let resultIndex = 0;

    fs.readFile("results/r.csv", "utf8", (err, file) =>
    {
        // If the directory cannot be scanned
        if (err)
        {
            return console.log("Unable to read file: " + err);
        }

        let data = d3.csvParse(file);
        let resultIndex = 0;

        try
        {
            resultIndex = parseInt(data[data.length - 1].Result) + 1;
        }
        catch (e)
        {
            // If there are no entries, just leave result index at 0
        }

        // give the file the new result index
        response.json(resultIndex);
    });
});
