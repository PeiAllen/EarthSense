import React from 'react';

import {  MenuList, Drawer, MenuItem, Grid, Card, CardActionArea, CardContent, Typography, CardActions, Button, AppBar, Toolbar, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './App.css';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CardThing from './CardThing.js';
import Plot from 'react-plotly.js';

class GraphView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
      
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return(
            <div id = "wrapper">
                <Plot
        data={[
          {
              // replace with real data from firebase
            x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            y: [2, 6, 3, 4, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
            type: 'scatter',
            mode: 'lines',
            marker: {color: 'blue'},
          },
        ]}
        layout={ {width: this.state.width, height: this.state.height*0.9, title: 'Graph View'} }
     />
            </div>
        )
    }
}

export default GraphView;