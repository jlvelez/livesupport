var MAXDATA = 170;
var counter = 0;
var dataset = [];
var dat;
function setMaxdata(length){
 MAXDATA = length;
}

  $(document).ready(function () {


    $( "#slider-samples" ).slider({
      range: "max",
      min: 60,
      max: 121,
      value: 60,
      slide: function( event, ui ) {
        //var len =   .val( ui.value );
        var value = $( "#slider-samples" ).slider( "option", "value" );
        console.log(value);
        //sendData("Setsamples");
        setMaxdata(value);
       
        console.log("valor de MAXDATA: "+ MAXDATA);
      }
    });

       

    $('#btn-start, #btn-stop').click( function(){

      switch (this.id){
        case "btn-stop":
        console.log("StopStream" );
        sendData( "StopStream" );
        break;

        case "btn-start":
        console.log("StartStream" );
        sendData( "StartStream" );
        dataset = [];
        break;
        default:
        break;
      }
  	});

  var socket = io();		// socket.io instance

   // this function sends data to the server. It's called when
   // the submit button is pressed:
	function sendData(data) {
		// send the server whatever is in the textInput box:
		socket.emit('message', data);
	}



	// if the server sends you data, act on it:
	socket.on('message', function(data) {
    dataset.push(dat);
    dat =[Math.floor(Date.now())/1000,data];

    if( dataset.length > MAXDATA){
       dataset.shift();
       //sendData( "StopStream");
       //console.log("Getting out");
    }
    
  
     $.plot($("#chart1"), [dataset],{
                serials:{shadowSize:0}

                });

	});

  });
