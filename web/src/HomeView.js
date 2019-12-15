import React from 'react';
import Typography from '@material-ui/core/Typography';
const images={
    logo:require('./logo.png'),
}
class HomeView extends React.Component {
    render() {
        return (
            <div>
            <img style={{width:'80%',paddingBottom:'20vh',paddingTop:'30vh',marginLeft:'auto',marginRight:'auto',display:'block'}} src={images.logo}/>
            <Typography variant="h1" style={{textAlign:'center'}}>About Us</Typography>
            <Typography variant="h5" style={{textAlign:'center'}}>WRITESTUFFHERE</Typography>
            </div>
        );
    }
}
export default HomeView;