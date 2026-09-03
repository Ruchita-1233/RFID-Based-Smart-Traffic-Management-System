#include <SPI.h>
#include <MFRC522.h>
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 2, 1, 0, 4, 5, 6, 7, 3, POSITIVE);
#define SS_PIN 10
#define RST_PIN 9
#define RED_LED 7
#define YELLOW_LED 6
#define GREEN_LED 5
#define BUZZER 2
MFRC522 mfrc522(SS_PIN, RST_PIN);
String ambulanceUID = "CC E6 66 82";
String ambulanceUID2 = "73 25 D6 2E";
const unsigned long RED_TIME = 30000;
const unsigned long YELLOW_TIME = 5000;
const unsigned long GREEN_TIME = 30000;
const unsigned long AMB_GREEN = 10000;
enum State {RED, YELLOW, GREEN, AMBULANCE};
State state = RED;
unsigned long stateStart = 0;
void setSignal(bool r,bool y,bool g){
 digitalWrite(RED_LED,r);
 digitalWrite(YELLOW_LED,y);
 digitalWrite(GREEN_LED,g);
}
void showLCD(const char *msg,int sec){
 lcd.setCursor(0,0);
 lcd.print("Smart Traffic ");
 lcd.setCursor(0,1);
 char line[17];
 snprintf(line,sizeof(line),"%-6s %2ds",msg,sec);
 lcd.print(" ");
 lcd.setCursor(0,1);
 lcd.print(line);
}
void enterState(State s){
 state=s;
 stateStart=millis();
 switch(s){
 case RED: setSignal(HIGH,LOW,LOW); break;
 case YELLOW: setSignal(LOW,HIGH,LOW); break;
 case GREEN: setSignal(LOW,LOW,HIGH); break;
 case AMBULANCE:
 setSignal(LOW,LOW,HIGH);
 tone(BUZZER,1200,300
 lcd.clear();
 lcd.setCursor(0,0);
 lcd.print("Give Way to the");
 lcd.setCursor(0,1);
 lcd.print(" AMBULANCE");
 break;
 }
}
bool ambulanceDetected(){
 if(!mfrc522.PICC_IsNewCardPresent()) return false;
 if(!mfrc522.PICC_ReadCardSerial()) return false;
 String uid="";
 for(byte i=0;i<mfrc522.uid.size;i++){
 uid += (mfrc522.uid.uidByte[i]<0x10?" 0":" ");
 }
 uid.toUpperCase();Serial.print("UID tag :");Serial.println(uid.substring(1));
 return (uid.substring(1)==ambulanceUID ||uid.substring(1)==ambulanceUID2 ) ;
}
void setup(){
 Serial.begin(9600);
 SPI.begin();
 mfrc522.PCD_Init();
 pinMode(RED_LED,OUTPUT);
 pinMode(YELLOW_LED,OUTPUT);
 pinMode(GREEN_LED,OUTPUT);
 pinMode(BUZZER,OUTPUT);
 Serial.println("Put your card to the reader...");
 Serial.println();
 lcd.begin(16,2);
 lcd.clear();
 enterState(RED);
}
void loop(){
 if(state=AMBULANCE && ambulanceDetected()){
 enterState(AMBULANCE);
 }
 unsigned long elapsed=millis()-stateStart;
 if(state==RED){
 int left=(RED_TIME-elapsed+999)/1000;
 if(left<0) left=0;
 showLCD("STOP",left);
 // Turn yellow ON during last 5 seconds before green
 if(elapsed>=RED_TIME-5000)
 setSignal(HIGH,HIGH,LOW);
 else
 setSignal(HIGH,LOW,LOW);
 if(elapsed>=RED_TIME)
 enterState(GREEN);
 }
 else if(state==GREEN){
 int left=(GREEN_TIME-elapsed+999)/1000;
 if(left<0) left=0;
// Turn yellow ON during last 5 seconds before green ends
 if(elapsed>=GREEN_TIME-5000)
 setSignal(LOW,HIGH,HIGH);
 else
 setSignal(LOW,LOW,HIGH);
 if(elapsed>=GREEN_TIME)
 enterState(RED);
 }
 else if(state==YELLOW){
 int left=(YELLOW_TIME-elapsed+999)/1000;
 if(left<0) left=0;
 showLCD("WAIT",left);
 if(elapsed>=YELLOW_TIME)
 enterState(GREEN);
 }
 else if(state==AMBULANCE){
 if(elapsed>=AMB_GREEN)
 enterState(RED);
 }
}
