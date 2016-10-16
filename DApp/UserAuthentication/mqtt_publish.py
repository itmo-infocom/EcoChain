# Import package
import paho.mqtt.client as mqtt
import time
import random

# Define Variables
MQTT_HOST = "iot.eclipse.org"
MQTT_PORT = 1883
MQTT_KEEPALIVE_INTERVAL = 60
MQTT_TOPIC = "SGB_USER_AUTHENTICATION"
WASTE_TYPES = ["Organic","Plastic","Glass","Metal","Cardboard"]
MQTT_MSG = ''




# Define on_publish event function
def on_publish(client, userdata, mid):
	print "Waste data Published..."
	print MQTT_MSG
	# print MQTT_MSG

# Initiate MQTT Client
mqttc = mqtt.Client()

# Register publish callback function
mqttc.on_publish = on_publish

# Connect with MQTT Broker
mqttc.connect(MQTT_HOST, MQTT_PORT, MQTT_KEEPALIVE_INTERVAL)		


count = 0
while count < 1: # will run till 60 seconds and the disconnect
	MQTT_MSG = '{"SGB":[{"id":"'+str(random.randint(00000000,99999999))+'", "location":"Doe"}],"USER":[{"id":"0x2910543af39aba0cd09dbb2d50200b3e800a63d2"}]}'
	mqttc.publish(MQTT_TOPIC,MQTT_MSG)
	time.sleep(1) #sleeps for a sec after sending the data
	count += 1

# Disconnect from MQTT_Broker
mqttc.disconnect()