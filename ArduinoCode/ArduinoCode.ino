/*******************************
 Arduino Code for Livesupport Project 
 Event : AngelHack SPS
 Date :  July 4th, 2015
 Written By: LiveSupport Team
 ********************************/
int data   = 0;
int Loplus = 5;
int Lominus = 6;
int EstadoEntradaAnalogica= 0;
int valorLeido = 0;

void setup() {
   // Inicializa la comunicacion serial.
  Serial.begin(57600);    
 pinMode(Loplus, INPUT);
 pinMode(Lominus, INPUT); 
}

void loop() {
 
  while (Serial.available()){
  
    data = Serial.parseInt();
   
   switch(data){
 
   case 1: //Start Stream            
            EstadoEntradaAnalogica = 1;
            break;
   case 2: //Stop Stream             
            EstadoEntradaAnalogica = 0;
            break;
   default:
           
           break;
   }  
  }
  if( EstadoEntradaAnalogica == 1 ){
    lecturaAnalogica(0);
  }
  //delay(100);
}

void lecturaAnalogica(int pinAnalogico ){
  
   if((digitalRead(Loplus) == 1)||(digitalRead(Lominus) == 1)){
    Serial.println('Por Favor conecte el sensor!');
  }
  else{
    // send the value of analog input 0:
      for(int i= 0; i < 300 ; i++)
      {
        valorLeido = analogRead(pinAnalogico);
        Serial.print("An/Lectura Analogica ");
        Serial.print(pinAnalogico);
        Serial.print(":");                 // Caracter Delimitador
        Serial.println(valorLeido);
      }
      Serial.println("An/Lectura Analogica ");
      Serial.print(":");
      Serial.println("End");  
    }
}

/*  debo hacer que la data salga en formato json  asi como se muestra en el ejemplo siguiente: 
    var x = [{timestamp: valor, value:valor},{timestamp: valor, value:valor}];
*/


