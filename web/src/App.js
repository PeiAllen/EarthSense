import React from 'react';

import {  MenuList, Drawer, MenuItem, Grid, Card, CardActionArea, CardContent, Typography, CardActions, Button, AppBar, Toolbar, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CardThing from './CardThing.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            render: 'dataview'
        }
    }

    toggleDrawer = () => {
        this.setState({open: !this.state.open});
    }

    setRender = (view) => {
        console.log("HI");
        console.log(view);
        // this.setState({
        //     render: view
        // })
    }

    render() {
        return (
            <div className="App">

                {/* <ClickAwayListener onClickAway={this.toggleDrawer}> */}
                <Drawer open={this.state.open} width={200} ModalProps={{ onBackdropClick: this.toggleDrawer}}>
                    <MenuItem> Data view </MenuItem>
                    <MenuItem> Graph view </MenuItem>
                    <MenuItem> Simulation </MenuItem>

                </Drawer>

                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5">
                            Data view
                        </Typography>
                    </Toolbar>
                </AppBar>
                

                <div id = "content">
                    <div id = "stream"> 
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <CardThing header = "hi" value = "123ppm" text = "info here"></CardThing>
                                <CardThing header = "hi" value = "123ppm" text = "info here"></CardThing>
                            </Grid>
                            <Grid item xs={6}>
                                <CardThing header = "hi" value = "123ppm" text = "info here"></CardThing>
                                <CardThing header = "hi" value = "123ppm" text = "info here"></CardThing>
                            </Grid>
                            
                        </Grid>
                    </Grid>


                    </div>
                </div>
        
            </div>
          );
    }

}

export default App;
