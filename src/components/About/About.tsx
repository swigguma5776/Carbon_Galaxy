import React, {useState} from 'react';
import { NavBar } from '../sharedComponents/NavBar';
import { 
    Typography,
    Divider,
    Button,
    CssBaseline,
    Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../Theme/themes';
import carbon_image from '../../assets/images/galaxy.jpg'; 
import { AnyArray } from 'immer/dist/internal';
import { color } from '@mui/system';

const LinkA = styled(Link)({
  display: "inline-flex",
  color: "#aedcc0",
  textDecoration: "none"
});



const myStyles = {
  content: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(6, 85, 121, 1)), url(${carbon_image});`,
    width: "100%",
    height: { sm: "100%", xs: '200%'},
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "absolute"
  }
};

  export const About = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);




  const handleDrawerOpen = () => {
      setOpen(true);
  }

  const handleDrawerClose = () => {
      setOpen(false); 
  }


return (
  <Box sx = {{display: 'flex'}}>
      <CssBaseline />
        <NavBar />
            <Box sx = {myStyles.content}>
              <Box sx={{ mt: '90px', textAlign: 'center', width: '80%', mr: 'auto', ml: 'auto'}}>
              <Typography variant='h6'>
                  About this App
              </Typography>
              <Typography variant='body1'>
                        Hi my name is Alex Swiggum and I am a Full-stack Software Engineer. Carbon Galaxy is a passion project for me
                        as I am enthusiastic about environmental wellbeing. My previous career, as a commercial Interior 
                        Designer, I got to see the impact the built-environment had but the virtual world is so much more nuanced. This application
                        was an attempt to learn more about how even the web has an impact and what that impact is. This is an open-source project 
                        located on <a style={{color: "#aedcc0", textDecoration: "none"}}href='https://github.com/swigguma5776/Carbon_Galaxy' target='_blank'>Github.</a>
                         I built the back-end utilizing Flask and a SQL database, and my front-end was designed and built in React.  
                </Typography>
                <br/>
                <Typography variant='body1'> 
                        Carbon Galaxy uses resources like the <a style={{color: "#aedcc0", textDecoration: "none"}} href="https://www.websitecarbon.com/api/" target='_blank'> Website Carbon API </a> and  
                        the <a style={{color: "#aedcc0", textDecoration: "none"}}href="https://github.com/thegreenwebfoundation/co2.js/blob/main/src/hosting-api.js" target='_blank'> Green Website Foundation </a> calculations to calculate the carbon emissions
                        of websites. Calculations are based on the following data: data transfers
                        over wires, bytes of data the website uses, energy intensity, energy source, and
                        website traffic. This isn't an exact science and something that continues
                        to be refined.
                </Typography> 
            </Box>
            <Box sx={{ mt: '20px', textAlign: 'center', width: '80%', mr: 'auto', ml: 'auto'}}>
              <Typography variant='h6'>
                  Offseting Your Carbon
              </Typography>
              <Typography variant='body1'> 
                      Major contributors to global warming are harmful greenhouse gases emissions and CO2 is the biggest culprit! 
                      For many leading developing countries reducing Carbon Emissions is their number one goal. This, of course,
                      has to happen at the top by reducing burning of fossil fuels. However, there are things that everyday people
                      can do to help offset their carbon footprint like carpool, eat less meat, and shop local! 
              </Typography>
              <br/>
              <Typography variant='body1'> 
                      By using Carbon Galaxy users not only can get a better understanding of the impact browsing the web
                      has on the environment, but they have the opportunity to offset some of harm. By clicking on the 
                      'Plant Trees' on the Dashboard an API call is made through the Ecosia servers. <a style={{color: "#aedcc0", textDecoration: "none"}} href="https://info.ecosia.org/what" target='_blank'>Ecosia</a> is a search engine platform
                      that generates income from ads. They than use that income to plant trees around the world! To date they've planted over 
                      150 million trees which they publish their financial report every month for transparancy. 
              
              </Typography>
            </Box>
            </Box>
  </Box>
    

)

}