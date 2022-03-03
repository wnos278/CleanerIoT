#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"            


// Thông tin về wifi
#define ssid "BKHUST"
#define password "035098000932slt"
#define mqtt_server "192.168.22.8" // IP của MQTTBroker server
const uint16_t mqtt_port = 1883; //Port của MQTTBroker TCP

// Khởi tạo để giao tiếp MQTT
WiFiClient espClient;
PubSubClient client(espClient);

// Định nghĩa các input và output
// HC-SR04
const int echoPin1 = 16;
const int echoPin2 = 5;
const int echoPin3 = 4;
const int trigPin1 = 0;
const int trigPin2 = 2;
const int trigPin3 = 14;

// L298N
const int inp4 = 12;
const int inp3 = 13;
const int inp2 = 15;
const int inp1 = 3;

// DHT11
const int DHTPIN = 1;      
const int DHTTYPE = DHT11;  
DHT dht(DHTPIN, DHTTYPE);

// toc do dong co
long duration1;
long duration2;
long duration3;
int distanceleft;
int distancefront;
int distanceright;
int a=0;
// biến lưu MODE: mặc định mode auto
int autocontrol = 0;

void setup() 
{
  Serial.begin(115200);
  delay(10);
  dht.begin();  
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port); 
  client.setCallback(callback);

// setup một số cổng ra và vào
// 3 cái này cho cảm biến hồng ngoại
  pinMode(trigPin1, OUTPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(trigPin3, OUTPUT);// Sets the trigPin as an Output
  pinMode(echoPin1, INPUT); // Sets the echoPin as an Input
  pinMode(echoPin2, INPUT);
  pinMode(echoPin3, INPUT);
  
  // 4 cái này cho L298N điều khiển động cơ
  pinMode(inp1, OUTPUT);
  pinMode(inp2, OUTPUT);
  pinMode(inp3, OUTPUT);
  pinMode(inp4, OUTPUT);
  
}

// Hàm kết nối wifi
void setup_wifi() 
{
  delay(2000);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
// Hàm call back để nhận dữ liệu
void callback(char* topic, byte* payload, unsigned int length) 
{
  Serial.print("Co tin nhan moi tu topic:");
  Serial.println(topic);
  for (int i = 0; i < length; i++) 
    Serial.print((char)payload[i]);

  // Dữ liệu bật tắt điều khiển
  if (payload[0] == '0')
  {
    autocontrol = 0;
    digitalWrite(inp1, LOW);
      digitalWrite(inp2, LOW);
      digitalWrite(inp3, LOW);
      digitalWrite(inp4,LOW);
  }
  if (payload[0] == '1') 
    autocontrol = 1;
  // Dữ liệu điều khiển máy hút bụi
  if (!autocontrol)
  {
    if (payload[0] == 'l')
    {
      digitalWrite(inp1, HIGH);
      digitalWrite(inp2, LOW);
      digitalWrite(inp3, HIGH);
      digitalWrite(inp4,LOW);
      delay(200);
    }
    else if (payload[0] == 'r')
    {
      digitalWrite(inp1, LOW);
      digitalWrite(inp2, HIGH);
      digitalWrite(inp3, LOW);
      digitalWrite(inp4, HIGH);
      delay(200);
    }
    else if (payload[0] == 'u')
    {
      digitalWrite(inp1, LOW);
      digitalWrite(inp2, HIGH);
      digitalWrite(inp3, HIGH);
      digitalWrite(inp4,LOW);
      delay(1000);
    }
    else if (payload[0] == 'd')
    {
      digitalWrite(inp1, HIGH);
      digitalWrite(inp2, LOW);
      digitalWrite(inp3, LOW);
      digitalWrite(inp4, HIGH);
      delay(200);
    }
    digitalWrite(inp1, LOW);
    digitalWrite(inp2, LOW);
    digitalWrite(inp3, LOW);
    digitalWrite(inp4,LOW);
  }
}
// Hàm reconnect thực hiện kết nối lại khi mất kết nối với MQTT Broker
void reconnect() 
{
  while (!client.connected()) // Chờ tới khi kết nối
  {
    // Thực hiện kết nối với mqtt user và pass
    if (client.connect("ESP8266_id1","admin","admin"))  //kết nối vào broker
    {
      Serial.println("Đã kết nối:");
      client.subscribe("hutbuiiotcommand");
      client.subscribe("hutbuiiothomeinfo");
    }
    else 
    {
      Serial.print("Lỗi:, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Đợi 5s
      delay(5000);
    }
  }
}

void loop() 
{
  if (!client.connected())// Kiểm tra kết nối
    reconnect();
  client.loop();
  delay(30);
  float h = dht.readHumidity();    
  float t = dht.readTemperature(); 
  String thongtin = "";
  thongtin.concat("{");
  thongtin.concat("\"temperature\":");
  thongtin.concat(t);
  thongtin.concat(", ");
  thongtin.concat("\"humidity\":");
  thongtin.concat(h);
  thongtin.concat("}");
  char cThongtin[50];
  thongtin.toCharArray(cThongtin, 50);
  Serial.println(cThongtin);
  client.publish("hutbuiiothomeinfo", cThongtin);
  
// Chạy tự động:
if (autocontrol)
{
  digitalWrite(trigPin1, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin1, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin1, LOW);
  duration1 = pulseIn(echoPin1, HIGH);
  
  distanceleft = duration1 * 0.034 / 2;
  Serial.print("Distance1: ");
  Serial.println(distanceleft);

  
  digitalWrite(trigPin2, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin2, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin2, LOW);
  duration2 = pulseIn(echoPin2, HIGH);
  distancefront = duration2 * 0.034 / 2;
  Serial.print("Distance2: ");
  Serial.println(distancefront);

  
  digitalWrite(trigPin3, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin3, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin3, LOW);
  duration3 = pulseIn(echoPin3, HIGH);
  distanceright = duration3 * 0.034 / 2;
  Serial.print("Distance3: ");
  Serial.println(distanceright);

  if (true)
  {
      digitalWrite(inp1, LOW);
      digitalWrite(inp2, HIGH);
      digitalWrite(inp3, HIGH);
      digitalWrite(inp4, LOW);
      delay(1000);
  }

if ((distanceleft <= 20 && distancefront > 20 && distanceright <= 20))
{
  // lùi
  digitalWrite(inp1, HIGH);
  digitalWrite(inp2, LOW);
  digitalWrite(inp3, LOW);
  digitalWrite(inp4, HIGH);
  delay(1500);
  // rẽ phải
  digitalWrite(inp1, LOW);
  digitalWrite(inp2, HIGH);
  digitalWrite(inp3, LOW);
  digitalWrite(inp4, HIGH);
  delay(1500);
  
}

if (distanceleft <= 20 && distancefront <= 20 && distanceright > 20) 
{
  // rẽ phải
  digitalWrite(inp1, LOW);
  digitalWrite(inp2, HIGH);
  digitalWrite(inp3, LOW);
  digitalWrite(inp4, HIGH);
  delay(1500);
}
if (distanceleft <= 20 && distancefront > 20 && distanceright > 20)
{
  // rẽ phải
  digitalWrite(inp1, LOW);
  digitalWrite(inp2, HIGH);
  digitalWrite(inp3, LOW);
  digitalWrite(inp4, HIGH);
  delay(1500);
  
}
if ((distanceleft > 20 && distancefront <= 20 && distanceright > 20))
{
  // lùi
  digitalWrite(inp1, HIGH);
  digitalWrite(inp2, LOW);
  digitalWrite(inp3, LOW);
  digitalWrite(inp4, HIGH);
  delay(1500);
  // rẽ phải
  digitalWrite(inp1, LOW);
  digitalWrite(inp2, HIGH);
  digitalWrite(inp3, LOW);
  digitalWrite(inp4, HIGH);
  delay(1500);
}
if ((distanceleft > 20 && distancefront > 20 && distanceright <= 20) || 
(distanceleft > 20 && distancefront <= 20 && distanceright <= 20))
{
      digitalWrite(inp1, HIGH);
      digitalWrite(inp2, LOW);
      digitalWrite(inp3, HIGH);
      digitalWrite(inp4,LOW);
      delay(1500);
}
}
}
