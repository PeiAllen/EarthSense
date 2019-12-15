#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include "DHTesp.h"
#include <NTPClient.h>
#include <WiFiUdp.h>

#include "MQ135.h"

MQ135 gasSensor = MQ135(A0);

//time
#define NTP_OFFSET   60 * 60      // In seconds
#define NTP_INTERVAL 60 * 1000    // In miliseconds
#define NTP_ADDRESS  "europe.pool.ntp.org"
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, NTP_ADDRESS, NTP_OFFSET, NTP_INTERVAL);

//#define WIFI_SSID "MIP Internet"
//#define WIFI_PASSWORD "Connect@MIP"

#define WIFI_SSID "blobheart2"
#define WIFI_PASSWORD "13579abc"

//#define WIFI_SSID "Sleep"
//#define WIFI_PASSWORD "Hmmmmmmm"

//#define WIFI_SSID "segment ree"
//#define WIFI_PASSWORD "20030524"

#define FIREBASE_HOST "air-quality-database.firebaseio.com"
#define FIREBASE_AUTH "KYRszKUaiWMSDxn9K5cgBloPCjgy0dNEG36fDuWZ"

//Humidity
uint8_t DHTPin = D8; 
DHTesp dht;

int value = 0;
int vHumidity = 0;

float sLoud = 0;
float sTot = 0;

int sVal = 0;
int gVal = 0;

void setup()
{
  Serial.begin(115200);
  pinMode (15, INPUT);
  
  timeClient.begin();

  delay(2000);
  Serial.println('\n');

  pinMode(BUILTIN_LED, OUTPUT);
  if(WiFi.status() == WL_CONNECTED){
    Serial.println("Connected!");  
  }else{
  wifiConnect();
  }
  if(WiFi.status() == WL_CONNECTED){
    Serial.println("Connected!");  
  }
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  dht.setup(5, DHTesp::DHT11);
  
  
}

void loop()
{  

  //setHumidity();


  setHumidity();
  delay(300);
  for(int i = 0; i<50; i++){
    noise();
    delay(50);  
  }
  gas();

  delay(300);
  
  for(int i = 0; i<50; i++){
    noise();
    delay(50);  
  }
  
  


  /*
  timeClient.update();

  //Firebase.pushInt("A", value);
  Firebase.pushInt("/Humidity/"+String(value), value);
  Firebase.pushInt("/Humidity/"+String(value), timeClient.getEpochTime());
  if(Firebase.failed()){
    Serial.println("failed");  
  }
  Serial.println(value);

  Serial.println(timeClient.getEpochTime());
  value++;

  if(WiFi.status() != WL_CONNECTED){
    wifiConnect();
    Serial.println("Connected!");  
  }
  
  delay(1000);
*/
}

void gas(){
  timeClient.update();

  float rzero = gasSensor.getRZero();
  float ppm = gasSensor.getPPM();
  Serial.println(ppm);
  Firebase.pushInt("/Air/"+String(gVal), ppm);
  Firebase.pushInt("/Air/"+String(gVal), timeClient.getEpochTime());
  
  if(Firebase.failed()){
    Serial.println("failed");  
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  }
  
  gVal ++;
  
}
void setHumidity()
{
  //delay(dht.getMinimumSamplingPeriod());

  timeClient.update();

  float val = dht.getHumidity();
  float val2 = dht.getTemperature();
  Serial.print(val);
  Serial.print(" ");
  Serial.println(val2);

  Firebase.pushFloat("/Humidity/"+String(value), dht.getHumidity());
  delay(10);
  Firebase.pushInt("/Humidity/"+String(value), timeClient.getEpochTime());
  delay(10);
  timeClient.update();

  Firebase.pushFloat("/Temperature/"+String(value), dht.getTemperature());
  delay(10);
  Firebase.pushInt("/Temperature/"+String(value), timeClient.getEpochTime());
  
  if(Firebase.failed()){
    Serial.println("failed");  
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  }

  value++;
  
}

void noise()
{
  int statusSensor =digitalRead(15);

  sTot ++;
  if(statusSensor == 1){
    sLoud ++;
  }else{
    //Serial.println("___");
  }
  if(sTot == 100){
    timeClient.update();
    int level = 0;
    Serial.println("Loudness value");
    Serial.println(sLoud/sTot);
    if(sLoud/sTot <= 0.03){
      level = 0;
    }else if(sLoud/sTot <= 0.06){
      level = 1;
    }else if(sLoud/sTot <= 0.1){
      level = 2;  
    }else{
      level = 3;  
    }
    Firebase.pushInt("/Noise/"+String(sVal), level);
    Firebase.pushInt("/Noise/"+String(sVal), timeClient.getEpochTime());
    if(Firebase.failed()){
      Serial.println("failed");  
      Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

    }
    sVal ++;
    sLoud = 0;
    sTot = 0;
   
  }
}

void wifiConnect()
{
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);             // Connect to the network
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID); Serial.println(" ...");

  int teller = 0;
  while (WiFi.status() != WL_CONNECTED)
  {                                       // Wait for the Wi-Fi to connect
    delay(1000);
    Serial.print(++teller); Serial.print(' ');
  }

  Serial.println('\n');
  Serial.println("Connection established!");  
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());         // Send the IP address of the ESP8266 to the computer
}
