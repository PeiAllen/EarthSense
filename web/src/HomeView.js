import React from 'react';
import Typography from '@material-ui/core/Typography';
const images={
    logo:require('./logo.png'),
}
class HomeView extends React.Component {
    render() {
        return (
            <div>
            <img style={{width:'80%',paddingBottom:'30vh',paddingTop:'30vh',marginLeft:'auto',marginRight:'auto',display:'block'}} src={images.logo}/>
            <Typography variant="h2" style={{textAlign:'center'}}>What is EarthSense?</Typography>
            <Typography variant="h6" style={{whiteSpace: 'pre-line', textAlign:'center'}}>EarthSense makes use of dynamic graphs, heat maps, and SMS to alert people of the conditions in the area</Typography>
            </div>
        );
    }
}
export default HomeView;