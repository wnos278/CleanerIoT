from time import sleep
import paho.mqtt.client as mqtt
from datetime import datetime
import random
import threading
import time
import json
import sys

# TODO: 1Threads So much message

def MQTTClientInit(message):
    

    def on_connect(client, userdata, flags, rc):
        print("Connected with result code \n" + str(rc))
        client.subscribe('tdcqueue')
        # Publish
        client.publish('tdcqueue', message, 0, False)

    def on_message(client, userdata, msg):
        print(msg.topic + " " + str(msg.payload))
        sys.exit(0)

    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    client.username_pw_set(username="admin", password="admin")

    client.connect("localhost", 1883, 60)

    client.loop_forever()


def thread_function():
    message = { "temperature": random.randint(0, 60), "humidity": random.randint(20, 120), "timestamp": datetime.now().timestamp(), "turnOnLed": False, "type": 1}
    MQTTClientInit(json.dumps(message))
    time.sleep(2)

# TODO:Create NUM_THREADS
NUM_THREADS = 100

for _ in range(NUM_THREADS):
    x = threading.Thread(target=thread_function)
    x.start()