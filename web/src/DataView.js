import React from 'react';

import {  MenuList, Drawer, MenuItem, Grid, Card, CardActionArea, CardContent, Typography, CardActions, Button, AppBar, Toolbar, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CardThing from './CardThing.js';
import './DataView.css';
import Plot from 'react-plotly.js';
import PlotThing from './PlotThing.js';
import * as firebase from "firebase/app";


class DataView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            airVals: {
                x: [],
                y: [],
                currentPPM: 0,
            },

            humidityVals: {
                x: [],
                y: [],
                currentHumidity: 0,
            },

            temperatureVals: {
                x: [],
                y: [],
                currentTemperature: 0,
            },

            noiseVals: {
                x: [],
                y: [],
                currentNoise: "",
            }
        }
       
    }

    componentDidMount() {
        var database = firebase.database();
        var airRef = database.ref('/Air');
        airRef.on('value', (ss) => {
            var mi = 1e100;

            var xVals = [];
        

            var yVals = [];
            var cnt = 1;
            var currentPPMcute = -1;
            ss.forEach(el => {
                console.log(el.val())
                if(Object.keys(el.val()).length == 2) {
                    var ppm = el.val()[Object.keys(el.val())[0]];
                    var time = el.val()[Object.keys(el.val())[1]];
    
                    mi = Math.min(mi, time);
                    yVals.push(ppm);
                    xVals.push(time);
                    currentPPMcute = ppm;
                }
            })

            for(var j = 0; j < yVals.length; j++) {
                xVals[j] -= mi;
            }
            
            console.log("hi");
            console.log(mi);
            console.log(xVals);
            console.log(yVals);

            this.setState({
                airVals: {
                    x: xVals,
                    y: yVals,
                    currentPPM: currentPPMcute,
                }
            })

            if(currentPPMcute > 5000) {
                console.log("texting for gas");
                fetch('http://172.17.51.128:5000/text/' + 'WARNING: An abnormally high amount of harmful gases were detected in your area. Be careful! :)').then((response) => {
                    console.log(response);
                })
            }
        })

        var humidityRef = database.ref('/Humidity');
        humidityRef.on('value', (ss) => {
            var mi = 1e100;

            var xVals = [];
        

            var yVals = [];
            var cnt = 1;
            var currentHumiditycute = -1;
            ss.forEach(el => {
                console.log(el.val())
                if(Object.keys(el.val()).length == 2) {
                    var ppm = el.val()[Object.keys(el.val())[0]];
                    var time = el.val()[Object.keys(el.val())[1]];
    
                    mi = Math.min(mi, time);
                    yVals.push(ppm);
                    xVals.push(time);
                    currentHumiditycute = ppm;
                }
            })

            for(var j = 0; j < yVals.length; j++) {
                xVals[j] -= mi;
            }
            
            console.log("hi");
            console.log(mi);
            console.log(xVals);
            console.log(yVals);

            this.setState({
                humidityVals: {
                    x: xVals,
                    y: yVals,
                    currentHumidity: currentHumiditycute
                }
            })

            if(currentHumiditycute < 25) {
                console.log("texting");
                fetch('http://172.17.51.128:5000/text/' + 'WARNING: An abnormally low amount of humidity was detected. This could be indicative of a forest fire or a drought, among other things.').then((response) => {
                    console.log(response);
                })
            }


        })

        var temperatureRef = database.ref('/Temperature');
        temperatureRef.on('value', (ss) => {
            var mi = 1e100;

            var xVals = [];
        

            var yVals = [];
            var cnt = 1;
            var currentTemperaturecute = -1;
            ss.forEach(el => {
                console.log(el.val())
                if(Object.keys(el.val()).length == 2) {
                    var ppm = el.val()[Object.keys(el.val())[0]];
                    var time = el.val()[Object.keys(el.val())[1]];
    
                    mi = Math.min(mi, time);
                    yVals.push(ppm);
                    xVals.push(time);
                    currentTemperaturecute = ppm;
                }
            })

            for(var j = 0; j < yVals.length; j++) {
                xVals[j] -= mi;
            }
            
            console.log("hi");
            console.log(mi);
            console.log(xVals);
            console.log(yVals);

            this.setState({
                temperatureVals: {
                    x: xVals,
                    y: yVals,
                    currentTemperature: currentTemperaturecute,
                }
            })

        
        })

        var noiseRef = database.ref('/Noise');
        noiseRef.on('value', (ss) => {
            var mi = 1e100;

            var xValsN = [];
            var yValsN = [];

            var cnt = 1;
            var currentNoisecute = -1;
            ss.forEach(el => {
                console.log(el.val())
                if(Object.keys(el.val()).length == 2) {
                    var ppm = el.val()[Object.keys(el.val())[0]];
                    var time = el.val()[Object.keys(el.val())[1]];
    
                    mi = Math.min(mi, time);
                    yValsN.push(ppm);
                    xValsN.push(time);
                    currentNoisecute = ppm;
                }
            })

            for(var j = 0; j < xValsN.length; j++) {
                xValsN[j] -= mi;
            }
            
            console.log("hi");
            console.log(mi);

            this.setState({
                noiseVals: {
                    x: xValsN,
                    y: yValsN,
                }
            })

            if(currentNoisecute === 0) {
                this.setState({
                    noiseVals: {
                        x: xValsN,
                        y: yValsN,
                        currentNoise: "Safe"
                    }
                })
            }

            if(currentNoisecute === 1) {
                this.setState({
                    noiseVals: {
                        x: xValsN,
                    y: yValsN,
                        currentNoise: "Mild"
                    }
                })
            }
            
            if(currentNoisecute === 2) {
                this.setState({
                    noiseVals: {
                        x: xValsN,
                    y: yValsN,
                        currentNoise: "Moderate"
                    }
                })
            }

            if(currentNoisecute === 3) {
                this.setState({
                    noiseVals: {
                        x: xValsN,
                        y: yValsN,
                        currentNoise: "Severe"
                    }
                })
                
                fetch('http://172.17.51.128:5000/text/' + 'WARNING: Large amounts of noise pollution detected near you. Be careful! :)').then((response) => {
                    console.log(response);
                })
            }
        })
    }

    render() {
        return(
            <div id = "content">
                <div id = "stream"> 
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <CardThing header = "Air Quality" value = {this.state.airVals.currentPPM + " ppm"} text = "Presence of harmful gases and chemicals"></CardThing>
                                <CardThing header = "Humidity" value = {this.state.humidityVals.currentHumidity + "%"} text = "Humidity of air"></CardThing>
                                <CardThing header = "Temperature" value = {this.state.temperatureVals.currentTemperature + " Celsius"} text = "Temperature of environment"></CardThing>
                                <CardThing header = "Noise" value = {this.state.noiseVals.currentNoise} text = "Noise level"></CardThing>
                                 
                                    
                            </Grid>
                            <Grid item xs={6} spacing={5}>
                                <PlotThing xVals = {this.state.airVals.x} yVals = {this.state.airVals.y}> </PlotThing>
                                <PlotThing xVals = {this.state.humidityVals.x} yVals = {this.state.humidityVals.y}> </PlotThing>
                                <PlotThing xVals = {this.state.temperatureVals.x} yVals = {this.state.temperatureVals.y}> </PlotThing>
                                <PlotThing xVals = {this.state.noiseVals.x} yVals = {this.state.noiseVals.y}> </PlotThing>

                            </Grid>
                            
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default DataView;