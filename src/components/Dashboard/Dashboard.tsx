import React, {useState} from 'react';
import { Drawer as MUIDrawer,
    Avatar,
    ListItem,
    List,
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
    Button,
    CssBaseline,
    Box,
    Dialog,
    DialogActions,
    DialogContent, 
    DialogContentText,
    DialogTitle,
    Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronRight, ChevronLeft } from '@mui/icons-material'; 
import { useNavigate } from 'react-router-dom';
import { theme } from '../../Theme/themes';
import { DataTable, CarbonForm } from '../../components';  
import { NavBar } from '../sharedComponents/NavBar';
import { useGetData } from '../../custom-hooks'; 
import carbon_image from '../../assets/images/galaxy.jpg'; 
import { AnyArray } from 'immer/dist/internal';


const LinkA = styled(Link)({
  display: "block",
  color: "white",
  marginBottom: "20px",
  marginTop: "100px",
  marginLeft: '20px', 
  textDecoration: "none"
});


const myStyles = {
    content: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(6, 85, 121, 1)), url(${carbon_image});`,
      width: "100%",
      height: "1250px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      position: "absolute"
    }
  };

  export const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [plantTreesOpen, setTreesOpen] = useState(false);
  let { carbonData, getData } = useGetData();

  let len = carbonData.length - 1
  let carbon_grams = 0
  for (let i = 0; i < (carbonData.length); i++ ){
      carbon_grams += parseFloat(carbonData[i].carbon_per_webpage)
  }
  console.log(carbon_grams.toFixed(2))
  console.log(typeof(carbon_grams))

  let trees = 0
  for (let i = 0; i < (carbonData.length); i++ ){
      trees += carbonData[i].trees_needed
  }


  const handleDialogOpen = () => {
      setDialogOpen(true);
  }

  const handleDialogClose = () => {
      setDialogOpen(false); 
  }

  const treeDialogOpen = async (trees: any) => {
    setTreesOpen(true)
      for (let i = 0; i < (trees); i++ ){
          console.log(i)
          const options = {
              method: 'GET',
              headers: {
                  'X-RapidAPI-Host': 'google-search1.p.rapidapi.com',
                  'X-RapidAPI-Key': '9aac146b28msha98b54ca2f39ee0p16455djsn9a0f2e345df6'
              }
          };
  
          const response = await fetch('https://google-search1.p.rapidapi.com/google-search?hl=en&q=Avengers%2BEndgame&gl=us', options)
              .then(response => response.json())
              .then(response => console.log(response))
              .catch(err => console.error(err));
              
              }
  }

  console.log(carbonData)

  const treeDialogClose = () => {
    setTreesOpen(false)
  }

 let myAuth = localStorage.getItem('auth')

 if (myAuth == 'true'){
  return (
      <Box sx = {{display: 'flex'}}>
          <CssBaseline />
          <NavBar />
            <Box sx={ myStyles.content } >
                { carbonData.length > 0 &&
                <Stack 
                  direction={{ md: "column", lg: "row" }}
                  spacing={{ xs: 1, md: 4 }}
                  width='80%'
                  alignItems="center"
                  justifyContent="space-between"
                  marginTop='100px'
                  marginRight='auto'
                  marginLeft='auto'>
                  <Box sx={{width: '100%', textAlign: 'center', color:'white'}}>
                    <Stack 
                      direction={{ xs: 'column', md: 'row'}}
                      justifyContent='center'
                      height='40px'
                      marginBottom='50px'
                      marginRight='auto'
                      marginLeft='auto'
                      maxWidth='500px'>
                          <Typography variant='h4' sx={{mr: '20px'}}>Welcome To Your Dashboard! </Typography>
                          <Button 
                            variant="contained"
                            size="large"
                            color="secondary"
                            sx={{width:'120px', mr:'auto', ml:'auto'}}
                            onClick={handleDialogOpen}>Track CO2</Button>
                    </Stack>
                    <Stack
                      direction={{xs: 'column', md: 'row'}}
                      justifyContent={{xs:'center', sm: 'space-between'}}
                      width='100%'
                      marginRight='auto'
                      marginLeft='auto'>
                      <Box sx={{textAlign: { xs: 'center', md: 'left'}, ml: '0px', mb: '20px'}}>
                        <Typography variant='h4'>
                          Last Added:
                        </Typography>
                        <br />
                        <br />
                        <br />
                        <Typography variant='h4' mb='20px'>
                        {carbonData[len].website_url}
                        </Typography>
                        <Divider variant='fullWidth' color='white'/>
                        <br/>
                        <br/>
                        <Typography variant='h6'>
                          Carbon Emissions: {carbonData[len].carbon_per_webpage} grams
                        </Typography>
                        <Typography variant='h6'>
                          Carbon Emissions Per Year: {carbonData[len].carbon_per_year} grams
                        </Typography>
                        <Typography variant='h6'>
                          Trees Needed to offset Carbon: {carbonData[len].trees_needed} trees 
                        </Typography>
                      </Box>
                      <Box sx={{ marginRight: {xs:'auto', md: '0px'}, marginLeft: 'auto', textAlign: {xs: 'center', md: 'right'}}}>
                        <Typography variant='h4'>
                          Total Dashboard:
                        </Typography>
                        <br/>
                          <Stack
                            direction={{ xs: "row" }}
                            spacing={{xs:4, md:10}}
                            mt={1}
                            mb={2}
                            ml={'auto'}
                            mr={'auto'}
                          >
                            <div>
                              <Avatar sx={{ bgcolor: "#9cd2b1", width: 80, height: 80 }}>
                                <b>{carbon_grams.toFixed(2)}</b> g
                              </Avatar>
                              <Typography sx={{textAlign: 'center'}}>Total C02</Typography>
                            </div>
                            <div>
                              <Avatar sx={{ bgcolor: "#c5cae9", width: 80, height: 80 }}>
                                <b>{trees * 20}</b> kg
                              </Avatar>
                              <Typography sx={{textAlign: 'center', display: 'flex', flexWrap: 'wrap', width: '80px'}}>Total C02 per Year</Typography>
                            </div>
                            <div>
                              <Avatar sx={{ bgcolor: "#2E979A", width: 80, height: 80 }}>
                                <b>{trees}</b> 
                              </Avatar>
                              <Typography sx={{textAlign: 'center'}}>Total Trees</Typography>
                            </div>
                          </Stack>
                          <Button 
                            variant="contained"
                            size="large"
                            color="primary"
                            sx={{width:'120px', mr:'auto', ml:'auto'}}
                            onClick={treeDialogOpen}>Plant Trees</Button>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
                } : { carbonData.length <= 0 &&
                  <Stack 
                    direction={{ xs: "column", md: "row" }}
                    spacing={{ xs: 1, md: 4 }}
                    width='80%'
                    alignItems="center"
                    justifyContent="center"
                    marginTop='100px'
                    marginRight='auto'
                    marginLeft='auto'>
                    <Box sx={{width: '100%', textAlign: 'center', color:'white'}}>
                      <Box sx={{display: 'flex', direction:'row', justifyContent: 'center', height: '40px', mb: '30px'}}>
                        <Typography variant='h4' sx={{mr: '20px'}}>Welcome To Your Dashboard! </Typography>
                        <Button 
                          variant="contained"
                          size="large"
                          color="secondary"
                          onClick={handleDialogOpen}>Track CO2</Button>
                      </Box>
                    </Box>
                  </Stack>
                }
                <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"></DialogTitle>
                    <DialogContent>
                        <DialogContentText>Let's calculate some carbon emissions!</DialogContentText>
                        <CarbonForm />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick = {handleDialogClose} color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Dialog sx={{width: {xs:'360px', md:'500px'}, marginRight: 'auto', marginLeft:'auto'}}open={plantTreesOpen} onClose={treeDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"></DialogTitle>
                    <DialogContent>
                        <DialogContentText>Congratulations! You planted {trees} trees which is the total
                        number of trees on your dashboard and offset roughly {trees * 20} kilograms of carbon. You Rock!</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={treeDialogClose} color = "primary">Done</Button> 
                    </DialogActions>
                </Dialog>
              <DataTable />
            </Box>
      </Box>

  )} else {
    return (
      <Box sx = {{display: 'flex'}}>
          <CssBaseline />
          <NavBar />
          <Box sx={myStyles.content}>
      <LinkA to="/signin">Please Sign In to see your Data</LinkA>
      </Box>
      </Box>
    )
  }

}