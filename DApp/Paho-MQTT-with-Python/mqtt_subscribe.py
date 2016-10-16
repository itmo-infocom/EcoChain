# This implementation of MQTT models the user authentication.
# A signal with user-id is sent from the SGB which is received and checked with the database by the python script.
# Now this database is in sync with the blockchain, a regular update is being made with some cron-job or infinite loop
# 


# Import package
import paho.mqtt.client as mqtt

# Define Variables
MQTT_HOST = "iot.eclipse.org"
MQTT_PORT = 1883
MQTT_KEEPALIVE_INTERVAL = 60
MQTT_TOPIC = "WASTE_DATA_JSON"


# Define on connect event function
# We shall subscribe to our Topic in this function
def on_connect(mosq, obj, rc):
    mqttc.subscribe(MQTT_TOPIC, 0)

# Define on_message event function. 
# This function will be invoked every time,
# a new message arrives for the subscribed topic 
def on_message(mosq, obj, msg):
	print "Topic: " + str(msg.topic)
	print "QoS: " + str(msg.qos)
	print "Payload: " + str(msg.payload)

	#Authenticate user here

def on_subscribe(mosq, obj, mid, granted_qos):
    print("Subscribed to Topic: " + 
	MQTT_TOPIC + " with QoS: " + str(granted_qos))

# Initiate MQTT Client
mqttc = mqtt.Client()

# Assign event callbacks
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_subscribe = on_subscribe

# Connect with MQTT Broker
mqttc.connect(MQTT_HOST, MQTT_PORT, MQTT_KEEPALIVE_INTERVAL)

# Continue monitoring the incoming messages for subscribed topic
mqttc.loop_forever()
