import React from 'react';

import {  MenuList, Drawer, MenuItem, Grid, Card, CardActionArea, CardContent, Typography, CardActions, Button, AppBar, Toolbar, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CardThing from './CardThing.js';

class SimulationView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                simulation here
            </div>
        )
    }
}

export default SimulationView;