const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = '',
      port = 5000

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

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

server.listen( process.env.PORT || port )