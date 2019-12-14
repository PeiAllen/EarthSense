import React from 'react';

import { Card, CardActionArea, CardContent, Typography, CardActions, Button } from '@material-ui/core';

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

                       
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.value}
                        </Typography>

                        
                        <Typography color="textSecondary">
                            {this.props.text}
                        </Typography>


                        
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Learn more
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default CardThing;