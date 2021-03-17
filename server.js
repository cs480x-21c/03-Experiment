const express = require("express");
const app = express();
const bodyparser = require("body-parser")
const fs = require('fs');
var nodemailer = require('nodemailer');

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
// app.use(express.static("views"));
app.use(express.static("public"));
app.use(express.static("BarChart"));
app.use(express.static("Pie Chart"));
app.use(express.static("Tree Map"));
app.use(express.static("views"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/consentNotify.html");
});


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Used like so
var arrs = [1, 2, 3, 4];
// shuffle(arrs);
console.log(arrs);
let index = -1
var csvContent = ''


app.get('/nextPage', function( req, res ){
    csvContent = ''
    shuffle(arrs);
    for (var i = 0; i < 4; i++){
        if (arrs[i] === 1){
            csvContent += 'pie_chart,'
        }
        else if (arrs[i] === 2){
            csvContent += 'tree_map,'
        }
        else if (arrs[i] === 3){
            csvContent += 'bar_vertical,'
        }
        else if (arrs[i] === 4){
            csvContent += 'bar_horizontal,'
        }
        if (i === 3){
            csvContent += '\n'
        }
    }
    index += 1
    if (arrs[index] === 1) {
        res.sendFile(__dirname + "/Pie Chart/index_pie.html")
    }
    else if (arrs[index] === 2) {
        res.sendFile(__dirname + "/Tree Map/index_tree.html")
    }
    else if (arrs[index] === 3) {
        res.sendFile(__dirname + "/BarChart/index_bar_vertical.html")
    }
    else if (arrs[index] === 4) {
        res.sendFile(__dirname + "/BarChart/index_bar_horizontal.html")
    }
    // res.sendFile(__dirname + "/Tree Map/index_tree.html")
})





let ansList = []
app.post('/recAns', bodyparser.json(), function( req, res ){
    console.log('body:',req.body)
    ansList.push(req.body.answer)
    // console.log(csvContent)

    let content = req.body.answer+','
    csvContent += content

    res.json({ success: req.body })
})




var mailOptions = {
    from: '1352795692@qq.com',
    to: ['rinemiya0203@gmail.com','xchen10@wpi.edu'],
    subject: 'hello',
    text: `hello`,
    attachments: [
        {   // filename and content type is derived from path
            path: './responds/data.csv'
        },
    ]
};



let transporter = nodemailer.createTransport({

    service: 'qq',
    port: 465,
    secureConnection: true,
    auth: {
        user: '1352795692@qq.com',

        pass: 'ditoplmicbpcjacf',
    }
});




app.get('/leads', function (req, res){
    index += 1
    if (index > 3){
        index = -1
        console.log(csvContent)
        fs.writeFile('./responds/data.csv', csvContent, function(err){
            if (err) console.log(err, '---->csv<---')
        })
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        csvContent = ''
        res.sendFile(__dirname + "/views/thankyou.html")
    }
    if (arrs[index] === 1) {
        res.sendFile(__dirname + "/Pie Chart/index_pie.html")
    }
    else if (arrs[index] === 2) {
        res.sendFile(__dirname + "/Tree Map/index_tree.html")
    }
    else if (arrs[index] === 3) {
        res.sendFile(__dirname + "/BarChart/index_bar_vertical.html")
    }
    else if (arrs[index] === 4) {
        res.sendFile(__dirname + "/BarChart/index_bar_horizontal.html")
    }
});