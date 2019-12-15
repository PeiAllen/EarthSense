import React from 'react';

import {  MenuList, Drawer, MenuItem, Grid, Card, CardActionArea, CardContent, Typography, CardActions, Button, AppBar, Toolbar, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CardThing from './CardThing.js';
import './DataView.css';
import Plot from 'react-plotly.js';
import PlotThing from './PlotThing.js';

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
                                <CardThing header = "hi" value = "123ppm" text = "info here"></CardThing>
                                <CardThing header = "hi" value = "123ppm" text = "info here"></CardThing>
                                 
                                    
                            </Grid>
                            <Grid item xs={6} spacing={5}>
                                <PlotThing xVals = {[1, 2, 3, 4, 5, 6,]} yVals = {[2, 4, 6, 2, 1, 2,]}> </PlotThing>
                                <PlotThing xVals = {[1, 2, 3, 4]} yVals = {[2, 4, 6, 2]}> </PlotThing>
                                <PlotThing xVals = {[1, 2, 3, 4]} yVals = {[2, 4, 6, 2]}> </PlotThing>
                                <PlotThing xVals = {[1, 2, 3, 4]} yVals = {[2, 4, 6, 2]}> </PlotThing>

                            </Grid>
                            
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default DataView;