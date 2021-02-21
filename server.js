const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = '',
      port = 5000,
      csv = require('csv-parser'),
      converter = require('json-2-csv');

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

//writing the csv file

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'trials.csv',
    header: [
      {id: 'id', title: 'ParticipantID'},
      {id: 'trial', title: 'TrialNum'},
      {id: 'vis', title: 'Vis'},
      {id: 'truePercent', title: 'TruePercent'},
      {id: 'reportedPercent', title: 'ReportedPercent'}
    ]
  });

//handles updating new data 

const updateData = function(request, response){
    let jsonData;
  request.on('data', function(data){
    jsonData = JSON.parse(data)
    console.log(jsonData)
    jsonData.error = Math.log(Math.abs(jsonData.reportedPercent-jsonData.truePercent))+(1/8)
    csvData = jsonData.id + ',' + jsonData.trial +  "," +jsonData.vis + "," + jsonData.truePercent + "," + jsonData.reportedPercent + "," + jsonData.error+ "\r\n"
    
    fs.appendFile('trials.csv', csvData, (err)=> {
        console.log("data was appended")
    })

 
  })
  request.on( 'end', function() {
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    //console.log()
    response.write(JSON.stringify(jsonData))
    response.end()
  })
}

const handlePost = function( request, response ) {
    
  if (request.url === '/submit'){
    updateData(request,response);
  }
  else{
    let dataString = ''

    request.on( 'data', function( data ) {
        console.log(data)
        dataString += data 
    })

    request.on( 'end', function() {
      console.log( "parse "+JSON.parse( dataString ) )
      response.writeHead( 200, "OK", {'Content-Type': 'application/json' })
      response.write(appdata)
      response.end()
    })
  }
}

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, '/index.html' )
  }
  else if(request.url === '/showData'){
    console.log(appdata)
    console.log("sending file")
    sendFile(response, 'trials.csv')
  }
  else{
    console.log(request.url)
    sendFile( response, filename )
  }
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end(content)

     }else{

       // file not found, error code 404
       response.writeHeader( 404)
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( 5000 )
console.log('Node.js web server at port 5000 is running..')

//process.env.PORT || port

/*

Reading the data from the csv file - if needed

const readData = fs.readFileSync('trials.csv','utf8')
const appdata= JSON.parse(readData)


const updateFile= function(){
  fs.writeFile('tasks.json', JSON.stringify(appdata), (error) => { 
    // In case of a error throw err exception. 
    if (error) throw err; 
  }) 
}
*/

  /*

  Extra code

  const data = [
    {
        id: 'John',
        trial: 'Snow',
        vis: 26,
        truePercent: 'M',
        reportedPercent: 'M'
    }
  ];

  csvWriter
  .writeRecords(data)
  .then(()=> console.log('The CSV file was written successfully'));

  //reading csv 
*//*
fs.createReadStream('trials.csv')
.pipe(csv())
.on('data', (row) => {
    console.log(row)
})
.on('end',()=> {console.log("success!");
});

*/