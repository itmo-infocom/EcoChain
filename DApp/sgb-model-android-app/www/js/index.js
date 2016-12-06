/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var connect = false;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        cordova.plugins.CordovaMqTTPlugin.connect({
                            url: 'tcp://192.168.0.105', //does not support mqtt://<ip>, strictly tcp://<ip> should be written
                            port:'1883',
                            
                            success:function(s){
                                connect = true;
                                /*alert('MQTT Broker connected successfully!');*/
                                document.getElementById("log").innerHTML = 'MQTT Broker connected successfully!';

                                cordova.plugins.CordovaMqTTPlugin.subscribe({
                                    topic:"AUTH_USER_REPLY",
                                    qos:0,
                                    success:function(s){
                                      
                                      document.addEventListener("AUTH_USER_REPLY",function (e) {
                                          e.preventDefault();
                                          document.getElementById("log").innerHTML += "--> Payload for"+e.topic+" topic: "+e.payload+"<br>"
                                          alert(e.payload);
                                      },false);

                                      cordova.plugins.CordovaMqTTPlugin.listen("AUTH_USER_REPLY",function (payload,params,topic,topic_pattern) {
                                          //params will be an empty object if topic pattern is NOT used. 
                                          alert("Reply: "+payload);
                                          document.getElementById("log").innerHTML += "--> Payload for"+topic+" topic: "+JSON.stringify(payload)+"<br>"
                                      })
                                    },
                                    error:function(e){
                                      
                                      alert("err!! something is wrong. check the console")
                                      console.log(e);
                                    }
                                  });//subscribe ends here
                            },
                            error: function(s){
                                alert("err!! something is wrong. check the console")
                                console.log(e);
                            }
                        });
        

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        var scanButton = document.getElementById('scanner');
        scanButton.addEventListener('click',function(){

            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    if(!result.cancelled){
                       // In this case we only want to process QR Codes
                       if(result.format == "QR_CODE"){
                            var decoded_qr_value = result.text;

                            if(!connect){

                                alert('Could not publish as there is no connection to broker');

                            }else{

                            cordova.plugins.CordovaMqTTPlugin.publish({
                                  topic:"AUTH_USER",
                                  payload: decoded_qr_value,
                                  qos:0,
                                  retain:false,
                                  success:function(s){
                                    document.getElementById("log").innerHTML += "--> Success: you have published to the topic, AUTH_USER<br>";
                                  },
                                  error:function(e){
                                    document.getElementById("log").innerHTML += "--> Error: something is wrong, "+e+"<br>";
                                    //alert("err!! something is wrong. check the console")
                                    console.log(e);
                                  }
                            });
                        }
                    }
                }
            });

        },false);
    }

};


/*function scan(){

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if(!result.cancelled){
                   // In this case we only want to process QR Codes
                   if(result.format == "QR_CODE"){
                        var decoded_qr_value = result.text;
                        // This is the retrieved content of the qr code
                        /*alert(value);
                        cordova.plugins.CordovaMqTTPlugin.connect({
                            url: 'tcp://192.168.0.105', //does not support mqtt://<ip>, strictly tcp://<ip> should be written
                            port:'1883',
                            
                            success:function(s){
                                connect = true;
                                /*alert('MQTT Broker connected successfully!');
                                document.getElementById("log").innerHTML = 'MQTT Broker connected successfully!';

                                //subscribe to edge-hub reply for the published decoded_qr_code below

                                cordova.plugins.CordovaMqTTPlugin.subscribe({
                                    topic:"AUTH_USER_REPLY",
                                    qos:0,
                                    success:function(s){
                                      
                                      /*document.addEventListener("AUTH_USER_REPLY",function (e) {
                                          e.preventDefault();
                                          document.getElementById("log").innerHTML += "--> Payload for"+e.topic+" topic: "+e.payload+"<br>"
                                          alert(e.payload);
                                      },false);

                                      cordova.plugins.CordovaMqTTPlugin.listen("AUTH_USER_REPLY",function (payload,params,topic,topic_pattern) {
                                          //params will be an empty object if topic pattern is NOT used. 
                                          alert("Reply: "+payload);
                                          document.getElementById("log").innerHTML += "--> Payload for"+topic+" topic: "+JSON.stringify(payload)+"<br>"
                                      })
                                    },
                                    error:function(e){
                                      //document.getElementById("activity").innerHTML += "--> Error: something is wrong when subscribing to this topic, "+e+"<br>";
                                      //document.getElementById("subscribe").style.display = "block";
                                      //document.getElementById("unsubscribe").style.display = "none";
                                      alert("err!! something is wrong. check the console")
                                      console.log(e);
                                    }
                                  });

                                cordova.plugins.CordovaMqTTPlugin.publish({
                                  topic:"AUTH_USER",
                                  payload: decoded_qr_value,
                                  qos:0,
                                  retain:false,
                                  success:function(s){
                                    document.getElementById("log").innerHTML += "--> Success: you have published to the topic, AUTH_USER<br>";
                                  },
                                  error:function(e){
                                    document.getElementById("log").innerHTML += "--> Error: something is wrong, "+e+"<br>";
                                    //alert("err!! something is wrong. check the console")
                                    console.log(e);
                                  }
                                });
                            },
                            error:function(e){
                                connect = false;
                                alert("err!! something is wrong. check the console")
                                console.log(e);
                            },
                            onConnectionLost:function (){
                              connect = false;
                                alert('connection lost with mqtt broker');
                            }
                        })
                   }else{
                      alert("Sorry, only qr codes this time ;)");
                   }
            }else{
              alert("The user has dismissed the scan");
            }
         },
         function (error) {
              alert("An error ocurred: " + error);
         }
    );

}
*/