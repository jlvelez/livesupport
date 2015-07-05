int data   = 0;
int estado = 0;
int pos    = 0;

int sensor1 = 0;
int sensor2 = 0;
int Loplus = 5;
int Lominus = 6;
int EstadoEntradasAnalogicas[] = {0,0,0,0,0,0};

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
            EstadoEntradasAnalogicas[0] = 1;
            break;
   case 2: //Stop Stream             
            EstadoEntradasAnalogicas[0] = 0;
            break;
   default:
           
           break;
   }  
  }
  if( EstadoEntradasAnalogicas[0] == 1 ){
    lecturaAnalogica(0);
  }
  
}

void lecturaAnalogica(int pinAnalogico ){
  
   if((digitalRead(Loplus) == 1)||(digitalRead(Lominus) == 1)){
    Serial.println('!');
  }
  else{
    // send the value of analog input 0:
    int valorLeido = analogRead(pinAnalogico);
      Serial.println(valorLeido);
      Serial.print("An/Entrada Analogica ");
      Serial.print(pinAnalogico);
      Serial.print(":");                 // Caracter Delimitador
      Serial.println(valorLeido);
  }
   delay(1);
}

/*  debo hacer que la data salga en formato json  asi como se muestra en el ejemplo siguiente: 
    var x = [{timestamp: valor, value:valor},{timestamp: valor, value:valor}];
*/
