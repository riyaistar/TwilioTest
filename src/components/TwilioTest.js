import React, { Component } from 'react';
import axios from 'axios'
import Twilio from './twilio'
let device = null;
let tracks = null;
let activeTask = {};
let isAudioJackListener = null;
class TwilioTest extends Component {

  componentDidMount() {
    device = new Twilio.Device();

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
        axios.get("http://localhost:8080/assoc?method=TWILIO_TOKEN&user_id=218782")
          .then(respose => {
            console.log("get>>>>>>>>>>>>>>>");
            console.log(respose);

            device.setup(respose.data.token, {
              audioConstraints: {
                mandatory: {
                  googAutoGainControl: false, googEchoCancellation: true, googNoiseSuppression: true, googHighpassFilter: false
                }
              }, debug: true, logLevel: 'info'
            });
            //console.log('Token: ' + respose.data.token);
            //console.log(device)
          })
          .catch(error => {
            console.error(console.error())
          })



           isAudioJackListener = true;
        if (window.navigator && window.navigator.geolocation) {
          window.navigator.geolocation.getCurrentPosition(
            function (position) {
              document.latitude = position.coords.latitude;
              document.longitude = position.coords.longitude;
            }
          );

        }
      }).catch(function (err) {
        // swal("Failed","Your device does not have an active microphone!",
        // "error");

      });


    console.log(device);



    device.on('ready', function (device) {
      console.log('device ready');
    });
    device.on('error', function (error) {
      console.log('device error');

    });
    device.on('offline', function (device) {
      console.log('device offline');

    })


    device.on('connect', function (conn) {
      console.log('connected');
      if (!activeTask.connection) {
        // console.log('Connection undefined before connect');
        activeTask.connection = conn;
        console.log("device_________________")
        console.log(device)
      }
      activeTask.connectedTime = new Date().getTime();
      // console.log('Successfully established call in ' +
      // (activeTask.connectedTime - activeTask.start) + 'ms!');
      activeTask.sid = activeTask.connection.parameters.CallSid;
      if (activeTask.type === 'OutboundTask') {
        console.log("making call")
      }
      if (activeTask.type === 'OutboundManual') {
        console.log("make cxalls to: " + activeTask.toNumber)
      }

    });




  }


  placeCall() {
    var customerPhone = document.getElementById('contact').value;

    activeTask = {};


    if (customerPhone.length < 20) {

      activeTask.toNumber = customerPhone;
      document.getElementById('contact').value = activeTask.toNumber;
      activeTask.start = new Date().getTime();
      activeTask.connectedTime = new Date().getTime();

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
          tracks = stream.getTracks();
          tracks.forEach(function (track) {
            track.stop();
          });
          var options = {
            To: customerPhone, record: 'record-from-answer-dual', enableRingingState: true, //callerId: user_mobile
          };
          options.callerId = "+15597853253";

          activeTask.connection = device.connect(options);
        }).catch(function (err) {
          console.error(err);
          console.error(' Your device does not have an active microphone!', 1);
        });
    } else {
      console.error('Seems like an invalid number, please double check, ensure the country code is added');

    }

  }

  endCall(){
    device.disconnectAll();
  }
  render() {
    return (
      <div> <input id="contact" type="number"></input>
        <button onClick={() => this.placeCall()}>SUBMIT</button> 
        <button onClick={() => this.endCall()}>END CALL</button>
        </div>
    );
  }
}

export default TwilioTest;