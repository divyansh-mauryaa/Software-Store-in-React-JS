import './App.css';
import { useState } from 'react';

//Software data
import SoftwareData from './data';

//Material UI imports
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import AppBar from '@mui/material/AppBar';

import { styled, alpha } from '@mui/material/styles';

//MUI Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { blue, red, blueGrey } from '@mui/material/colors';
import AppleIcon from '@mui/icons-material/Apple';
import LaptopIcon from '@mui/icons-material/Laptop';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

//Card Expand Button Logic
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

//AppBar Search bar style logic
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

//Search bar wrapper style logic
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      //Default Width
      width: '19ch',
      '&:focus': {
        //onClick expanded Width
        width: '30ch',
      },
    },
  },
}));

function App() {
  //State Expanded
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //search bar logic
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the software list based on the search term
  const filteredSoftwareData = SoftwareData.filter((software) =>
    software.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="Container-fluid">
      {/* AppBar for React App */}
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Software Store
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Softwares…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
              // style={{ width: 300 }}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <br /><br /><br />


      {/* <Typography id='heading' variant='h1'>Software-Store</Typography> */}
      <br />
      <Typography id='sub-heading' variant='h3'>Browse Softwares for Mac, Linux and Windows form one place, Orignal and Virus free!</Typography>
      <Typography id='sub-heading' variant='h6'><small style={{color: 'red'}}>Note: If the download link for a platform goes to an example domain, then the app is not avalable for that OS(Platform) </small></Typography>
      <br />
      <br /><br /><br />
      {/* <Typography variant='h5'>Software List</Typography> */}
      <br /><br /><br />
      <div className="row" id='card-row'>
        {filteredSoftwareData.map((software) => (
          <>
            <Card key={software.id} id='software-card' sx={{ maxWidth: 330 }}>
              <CardHeader
                avatar={
                  <Avatar alt={software.company} src={software.company_logo} />
                }
                title={software.name}
                subheader={software.company}
              />
              <CardMedia
                component="img"
                height="154"
                image={software.logo}
                alt={software.name}
                title={software.name + " " + "logo"}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {software.discription}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
              <Typography variant='h6' style={{color: '#2196f3',}}>Download </Typography> ----------------------
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <center>
                    <Button variant='contained' target='_blank' href={software.windows}><MicrosoftIcon style={{ marginRight: 10 }} />Windows Download</Button>
                    <br /><br />
                    <Button variant='contained' target='_blank' href={software.mac}><AppleIcon style={{ marginRight: 10 }} />MAC Download</Button>
                    <br /><br />
                    <Button variant='contained' target='_blank' href={software.linux}><LaptopIcon style={{ marginRight: 10 }} />Linux Download</Button>
                    <br /><br /><br />
                  </center>
                </CardContent>
              </Collapse>
            </Card>
            <br /><br /><br /><br /><br /><br />
          </>
        ))}
      </div>
      <br /><br /><br /><br /><br /><br />
      <center>We could not find any more softwares like that</center>
    </div>
  );
}

export default App;
