#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include "DHTesp.h"
#include <NTPClient.h>
#include <WiFiUdp.h>

//time
#define NTP_OFFSET   60 * 60      // In seconds
#define NTP_INTERVAL 60 * 1000    // In miliseconds
#define NTP_ADDRESS  "europe.pool.ntp.org"
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, NTP_ADDRESS, NTP_OFFSET, NTP_INTERVAL);

#define WIFI_SSID "MIP Internet"
#define WIFI_PASSWORD "Connect@MIP"

//#define WIFI_SSID "poopoo"
//#define WIFI_PASSWORD "13579abc"

#define FIREBASE_HOST "air-quality-database.firebaseio.com"
#define FIREBASE_AUTH "KYRszKUaiWMSDxn9K5cgBloPCjgy0dNEG36fDuWZ"

//Humidity
uint8_t DHTPin = D8; 
DHTesp dht;

int value = 0;
int vHumidity = 0;


void setup()
{
  Serial.begin(115200);
  timeClient.begin();

  delay(2000);
  Serial.println('\n');
  
  wifiConnect();
  if(WiFi.status() == WL_CONNECTED){
    Serial.println("Connected!");  
  }
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  dht.setup(5, DHTesp::DHT11);
}

void loop()
{  

  setHumidity();
  delay(1000);
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
  Firebase.pushInt("/Humidity/"+String(value), timeClient.getEpochTime());

  timeClient.update();

  Firebase.pushFloat("/Temperature/"+String(value), dht.getTemperature());
  Firebase.pushInt("/Temperature/"+String(value), timeClient.getEpochTime());
  
  if(Firebase.failed()){
    Serial.println("failed");  
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

  }

  value++;
  
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
