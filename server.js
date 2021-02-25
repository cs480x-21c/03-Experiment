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
    let result = request.body.children;
    console.log(result);

    let resultArray = result.map(function(d, i)
    {
        return [d.resultIndex, d.trialIndex, d.chartType, d.correctAnswer, d.participantAnswer];
    });

    console.log(resultArray);


    // fs.appendFile("results/r.csv", resultCSV, function (err)
    // {
    //     if (err)
    //     {
    //         return console.log(err);
    //     }
    //     else
    //     {
    //         console.log("result recorded");
    //     }
    // });

    response.json("result recorded");
});

// Gets a new index for the result file, the new one is the latest index + 1
app.post('/resultIndex', async (request, response) =>
{
    let resultIndex = 0;

    fs.readdir("results/", (err, files) =>
    {
        // If the directory cannot be scanned
        if (err)
        {
            return console.log('Unable to scan directory: ' + err);
        }

        files.forEach((file) =>
        {
            // Do whatever you want to do with the file
            try
            {
                // Takes the file and isolates the result number
                let currentResultIndex = parseInt(file.substring(6).replace(".json", ""), 10);
                console.log(currentResultIndex);
                if (currentResultIndex > resultIndex)
                {
                    resultIndex = currentResultIndex;
                }
            }
            catch
            {
                // not a proper results file, ignore it
            }
        });

        // Add 1 to the result index, the scanner is done
        response.json(resultIndex + 1);
    });
});
