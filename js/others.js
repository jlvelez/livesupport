  /*
    Socket.io example

    Shows how to make a basic webSocket connection between a client and a server
    using Socket.io version 1.0 or later (http://socket.io/)

    created 11 June 2015
    by Miklos Szabo
*/


  $(document).ready(function () {

//*******************************   Control de Salidas Digitales  *************************************
  	var btnState = [false,false];
    
  	$('#btn-out-1, #btn-out-2').click( function(){

                switch (this.id){
                      case "btn-out-1":
             		$('.led-1').toggleClass("led-green");
  			btnState[0] = !(btnState[0]);
  			console.log( setMessage(btnState[0],0));
  			sendData( "StopStream" );
                        break;
                      case "btn-out-2":
                        $('.led-2').toggleClass("led-green");
  			btnState[1] = !(btnState[1]);
			console.log( setMessage(btnState[1],1));
			sendData( "StartStream" );
                        break;
                      default;
                        break;
                }
  	});

  //****************************   Control Entradas Analogicas   ***************************************
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
		 
		 //array = [[0, data], [1, data],[2,data],[3,data]];
		if( dataset.length > 120 ){ 
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
		}

		$.plot($("#chart1"), [dataset]);
	});

  });
