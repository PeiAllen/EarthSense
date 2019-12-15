import React from 'react';

import {MenuList, Drawer, MenuItem, Grid, Card, CardActionArea, CardContent, Typography, CardActions, Button, AppBar, Toolbar, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CardThing from './CardThing.js';
import DataView from './DataView.js';
import GraphView from './GraphView.js';
import HomeView from './HomeView.js';
import MapView from './MapView.js';
import SimulationView from './SimulationView.js';
import * as firebase from "firebase/app";

import "firebase/firestore";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            render: 'Home View'
        }

        firebase.initializeApp ({
            apiKey: "AIzaSyArt6XkQYnJBrCyxyAbrnKC-Ry3VzGlinc",
            authDomain: "air-quality-database.firebaseapp.com",
            databaseURL: "https://air-quality-database.firebaseio.com",
            projectId: "air-quality-database",
            storageBucket: "air-quality-database.appspot.com",
            messagingSenderId: "840873520488",
            appId: "1:840873520488:web:a1e6ee18027ec613c17add",
            measurementId: "G-G281J6PEWN"
          });
        
        
    }

    toggleDrawer = () => {
        this.setState({open: !this.state.open});
    }

    setRender = (view) => {
        console.log("switching to "+view);
        this.setState({
            render: view
        })
        this.toggleDrawer();
    }

    render() {
        return (
            <div className="App">
                <Drawer open={this.state.open} width={200} ModalProps={{ onBackdropClick: this.toggleDrawer}}>
                    <MenuList>
                        <MenuItem onClick={() => this.setRender('Home View')}> Home </MenuItem>
                        <MenuItem onClick={() => this.setRender('Data View')}> Data </MenuItem>
                        <MenuItem onClick={() => this.setRender('Simulation View')}> Simulation </MenuItem>
                        <MenuItem onClick={() => this.setRender('Map View')}> Map </MenuItem>
                    </MenuList>
                </Drawer>

                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5">
                            {this.state.render}
                        </Typography>
                    </Toolbar>
                </AppBar>
                {this.state.render==='Data View'?<DataView> </DataView>:(this.state.render==='Simulation View'?<SimulationView> </SimulationView>:(this.state.render==='Home View'?<HomeView></HomeView>:<MapView> </MapView>))}
               
        
            </div>
          );
    }

}

export default App;
