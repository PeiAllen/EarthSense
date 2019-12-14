import React from 'react';

import {  MenuList, Drawer, MenuItem, Grid, Card, CardActionArea, CardContent, Typography, CardActions, Button, AppBar, Toolbar, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CardThing from './CardThing.js';

class DataView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
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
        )
    }
}

export default DataView;