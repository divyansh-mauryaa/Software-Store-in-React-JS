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

import { styled } from '@mui/material/styles';

//MUI Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { blue, red } from '@mui/material/colors';
import AppleIcon from '@mui/icons-material/Apple';
import LaptopIcon from '@mui/icons-material/Laptop';

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


function App() {
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
      <Typography id='heading' variant='h1'>Software-Store</Typography>
      <br />
      <Typography id='sub-heading' variant='h3'>Browse Softwares for Mac, Linux and Windows form one place, Orignal and Virus free!</Typography>
      <br />
      <center>
        <div id='searchbarzone'>
          <TextField
            id='standard-basic'
            label="Search Your Favorate Software..."
            variant="standard"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: 1000, }}
          />
        </div>
      </center>
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
