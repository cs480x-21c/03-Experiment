let express = require('express');
let mongoDB = require('mongodb');
let bodyParser = require('body-parser');

//mongoDB configuration
// constants and variable related to establishing a connection to the cluster
const uri = "mongodb+srv://cscholler:XZnw1ESAQ0BZq6xHItU9XC@experimentcs480x.ht8se.mongodb.net/ExperimentDatabase?retryWrites=true&w=majority";
const client = new mongoDB.MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology:true })
let collection = null;

client.connect().then( () => {
    // will only create collection if it doesn't exist
    return client.db('ExperimentDatabase').collection('ExperimentCollection');
}).then( __collection => {
    // store reference to collection
    collection = __collection
    return "Connected to MongoDB!";
}).then( console.log )

//center of it all
let app = express();

app.use(express.static('./public'));

app.get('/test', bodyParser.json(),(req, res) => {
    console.log("boom!")
    res.json({hello: 'test'});
});

app.post('/submitToMongo', bodyParser.json(), (req, res) => {
   let data = req.body;
   console.log(data);
   collection.insertOne(data).then((result) => {
       console.log(result);
   })
})

//lets you know that we are online
// TODO: change 3000 to process.env.PORT when uploading to glitch
let listener = app.listen(process.env.PORT, () => {
    console.log("we are connected and running!");
})

