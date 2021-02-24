// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
var bodyParser = require("body-parser");
let fs = require("fs");
const app = express();
var jsonParser = bodyParser.json();

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});


// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("scripts"));

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});


//

app.post('/result', jsonParser, (request, response) => {
  let result = request.body;
  let fileName = result.fileName;

  delete result.fileName;

  console.log(result);




  fs.writeFile("results/"+fileName, JSON.stringify(result), function (err){
    if (err) {
      return console.log(err);
    }
    else
    {
      console.log(fileName + " was saved");
    }

  });

  response.json("SUCC");
})

app.post('/resultIndex', async (request, response) => {

  let resultIndex = 0;

  fs.readdir("results/", (err, files) => {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach((file) =>
    {
      // Do whatever you want to do with the file
      try
      {
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

    // Add 1 to the result index
    response.json(resultIndex + 1);
  });


})

