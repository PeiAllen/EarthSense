import React from 'react';

import {  MenuList, Drawer, MenuItem, Grid, Card, CardActionArea, CardContent, Typography, CardActions, Button, AppBar, Toolbar, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CardThing from './CardThing.js';
import DataView from './DataView.js';
import GraphView from './GraphView.js';
import SimulationView from './SimulationView.js';
import MapView from './Map.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            render: 'Data View'
        }
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
                        <MenuItem onClick={() => this.setRender('Data View')}> Data view </MenuItem>
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
                {this.state.render==='Data View'?<DataView> </DataView>:(this.state.render==='Simulation View'?<SimulationView> </SimulationView>:<MapView> </MapView>)}
               
        
            </div>
          );
    }

}

export default App;
