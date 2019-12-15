import React from 'react';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Card, CardActionArea, CardContent, Typography, CardActions, Button } from '@material-ui/core';

import './CardThing.css';
class CardThing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id = "cardWrapper">
                <Card>
                    <CardActionArea>
                        <CardContent>

                        <Typography variant="body2" component="p">
                            {this.props.header}
                        </Typography>

                       
                        <Typography gutterBottom variant="h3" component="h2">
                            {this.props.value}
                        </Typography>

                        
                        <Typography color="textSecondary">
                            {this.props.text}
                        </Typography>


                        
                        </CardContent>
                    </CardActionArea>
                    <ExpansionPanel square>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Learn More</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
                </Card>
            </div>
        )
    }
}

export default CardThing;