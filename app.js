/*
    Socket.io example

    Shows how to make a basic webSocket connection between a client and a server
    using Socket.io version 1.0 or later (http://socket.io/)

    created 11 June 2015
    by Miklos Szabo
*/

var express = require('express');           // include express.js
var app = express();                        // make an instance of express.js
var http = require('http').Server(app);     // include http and make a server instance with the express instance
var io = require('socket.io')(http);        // include socket.io and make a socket server instance with the http instance
process.setMaxListeners( 0 );               // Thanks Richard Siwady for this awesome solution for eventListener bug.

// send the index page if you get a request for / :
app.get('/', sendIndex);

app.use(express.static(__dirname + '/website'));


var serialport = require("serialport"),     // include the serialport library
    SerialPort  = serialport.SerialPort,    // make a local instance of serial
    portName = process.argv[2];             // get the port name from the command line

// open the serial port. Uses the command line parameter:
var myPort = new SerialPort(portName, { 
    baudRate: 57600,
    // look for return and newline at the end of each data packet:
    parser: serialport.parsers.readline("\r\n") 
});

myPort.on('open',listen);

myPort.on('close', closePort);      // called when the serial port closes
myPort.on('error', serialError);    // called when there's an error with the serial port
myPort.on('data',  fromArduino);

function listen(){
    console.log('port open');
    console.log('baud rate: ' + myPort.options.baudRate);
    myPort.on('data', function(data){
        //console.log("Arduino Says:"+data);
    });   // called when there's new incoming serial data
    
    // you only need this function if your port is open,
    // so it's local to the listen() function:
    function printIncoming(data) {
        console.log(data);
    }
}

function closePort() {
    console.log('port closed');
}

function serialError(error) {
    console.log('there was an error with the serial port: ' + error);
    myPort.close();
}

function fromArduino(data){
    receivedDataHandler(data);
}

function SendtoArduino(data){
    if( myPort.isOpen() ){
        myPort.write(data);
    }
}

// callback function for 'get /' requests:
function sendIndex(request, response){
    response.sendFile(__dirname + '/website/index.html');
}


io.on('connection', function(socket){
    console.log('a user connected');
    console.log(socket.handshake.address);
    
    // send something to the web client with the data:
    socket.on('message', function(data) {
        var dat = sendDataHandler(data);
        console.log("Envia a Arduino: "+data);
        SendtoArduino(dat);
    });
    
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

function sendDataHandler(data){
        switch (data){
	    case "StopStream":
              return '2';
            case "StartStream":
               return '1';
            default:
              return '0';
        }
}

function receivedDataHandler(data){
 console.log(data);
 var packet       = data.split("/");
 var header       = packet[0];
 var content      = packet[1];
 var analogPacket = 0;
 var analogData   = 0;
 var dataArray = [];
 var index  = 0;
 switch(header)
  {
    case "dig": console.log(content); break;
    case "An":
      var i = 0;
      for(i= 0; i <300 ; i++){
        
        analogPacket = content.split(":");
      //var timestamp = Math.floor( Date.now() / 1000);
      // analogData =  timestamp+ ":" + analogPacket[1];
       analogData = analogPacket[1];
       dataArray[i] = analogData;
       console.log(analogData);
       
       console.log("indexValue: "+ i);
      }
      SendtoArduino(2); // stop stream;
      //  io.emit("message",dataArray);
       break;
    default:
       break;
  }
    
 }


/*  NOTA:  Esta funcion, trabaja al 100%  la comente para terner un referencia, en caso 
de que me pierda. 

io.on('connection', function(socket){
    console.log('a user connected');
    console.log(socket.handshake.address);
    
    // send something to the web client with the data:
    
    socket.on('message', function(data) {

        console.log('received from client: ' + data);

    });
});
*/

// listen for incoming server messages:
http.listen(8082,'0.0.0.0', function(){
  console.log('listening on port 8082');
});

/* listen for incoming server messages:
http.listen(8080, function(){
  console.log('listening on port 5080');
});
*/
