import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Card, CardActionArea, CardContent, Typography, CardActions, Button } from '@material-ui/core';

import Plot from 'react-plotly.js';
import './PlotThing.css'

class PlotThing extends React.Component {
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
            <Card id="hi"> 
                 <Plot
            data={[
            {
                // replace with real data from firebase
                x: this.props.xVals,
                y: this.props.yVals,
                type: 'scatter',
                mode: 'lines',
                marker: {color: this.props.color},
            }
            ]}
            layout={ {width: this.state.width/2, height: (this.state.height)/1.915, title: 'Graph View'} }
        />
            </Card>
           
        )
    }
}

export default PlotThing