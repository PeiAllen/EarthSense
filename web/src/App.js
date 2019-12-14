import React from 'react';

import { Grid, Card, CardActionArea, CardContent, Typography, CardActions, Button, AppBar, Toolbar, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';
import CardThing from './CardThing.js';
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
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
