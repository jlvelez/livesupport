  /*
    Socket.io example

    Shows how to make a basic webSocket connection between a client and a server
    using Socket.io version 1.0 or later (http://socket.io/)

    created 11 June 2015
    by Miklos Szabo
*/


  $(document).ready(function () {

//*******************************   Control de Salidas Digitales  *************************************
  
    
  	$('#btn-start, #btn-stop').click( function(){

      switch (this.id){
        case "btn-stop":
        console.log("StopStream" );
        sendData( "StopStream" );
        break;

        case "btn-start":
        console.log("StartStream" );
        sendData( "StartStream" );
        break;
        default:
        break;
      }
  	});

  //****************************   Control Entradas Analogicas   ***************************************
 /*
  $(function() {
    $('#analog1-enable').change(function() {
    	var msg = "StopStream";
    	console.log(msg );
        sendData(msg);
    })
  });

  $(function() {
    $('#analog2-enable').change(function() {
    	var msg = "Entrada-Analogica1-"+ $(this).prop("checked");
    	console.log(msg );
        sendData(msg);
    })
  });
*/

// ********************      Funciones Socket.io     ******************************	 

  var socket = io();		// socket.io instance

   // this function sends data to the server. It's called when
   // the submit button is pressed:
	function sendData(data) {
		// send the server whatever is in the textInput box:
		socket.emit('message', data);
	}

	var counter = 0;
	var dat = [];
	var dataset = [];
	// if the server sends you data, act on it:
	socket.on('message', function(data) {
		 console.log(data);
		 
     console.log("counter es:"+counter);
      console.log("dataset length es:"+ dataset.length);
      for(var counter =0 ; counter < data.length; counter++){
            dat =[Math.floor(Date.Now())/1000,data];
            dataset.push(dat);
      }
		 //array = [[0, data], [1, data],[2,data],[3,data]];
		/*if( dataset.length > 120 ){ 
			dataset.shift(); 
			counter =0;
			dataset = [];
		}
		else{
			console.log("counter es:"+counter);
			console.log("dataset length es:"+ dataset.length);
			 counter += 1;
			dat =[counter,data];
			dataset.push(dat);
		}*/

		$.plot($("#chart1"), [dataset]);
	});

  });
