import React, { Component } from 'react'

class DashboardCenter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            latitude: 0,
            longitude: 0
        };
    };

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition.bind(this), this.showError, { //bind showposition callback function to 'this'
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    showPosition(position) {
        console.log(this)
        this.setState(
            {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            () => {
                console.log("Callback from setting state", position)
            }
        )
        console.log("Latitude: " + position.coords.latitude);
        console.log("Longitude: " + position.coords.longitude);
    }

    showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred.");
                break;
            default:
                console.error("UNKNOWN ERROR")
        }
    }

    getMicPermission() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                console.log("stream" + stream)
            })
            .catch(function (err) {
                console.error("ERR" + err)
            });
    }

    makeCall() {
        console.log(document.getElementById('contact'))
    }

    render() {
        return (
            <div>
                <div>Location : Latitude---->{this.state.latitude}</div>
                <div>Latitude---->{this.state.longitude}</div>
                <button onClick={() => this.getLocation()}>getLocation</button>


                <div>Microphone permission status: </div>
                <button onClick={() => this.getMicPermission()}>Mic</button>

                {/* <ROW>
                    <input id="contact" type="number"></input>
                    <button onClick={() => this.makeCall()}></button>
                </ROW> */}
            </div>
        )
    }
}

export default DashboardCenter;