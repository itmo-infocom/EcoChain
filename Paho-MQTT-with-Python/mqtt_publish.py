# Import package
import paho.mqtt.client as mqtt
import time
import random

# Define Variables
MQTT_HOST = "iot.eclipse.org"
MQTT_PORT = 1883
MQTT_KEEPALIVE_INTERVAL = 60
MQTT_TOPIC = "WASTE_DATA_JSON"
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
while count < 60: # will run till 60 seconds and the disconnect
	MQTT_MSG = '{"SGB":[{"id":"'+str(random.randint(00000000,99999999))+'", "location":"Doe"}],"WASTE":[{"type":"'+random.choice(WASTE_TYPES)+'","weight":"'+str(random.randint(000,9999))+'gm"}],"USER":[{"id":"'+str(random.randint(00000000,99999999))+'","credit":"false"}]}'
	mqttc.publish(MQTT_TOPIC,MQTT_MSG)
	time.sleep(1) #sleeps for a sec after sending the data
	count += 1

# Disconnect from MQTT_Broker
mqttc.disconnect()