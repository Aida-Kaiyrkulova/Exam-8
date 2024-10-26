import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1, mb:5}}>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" component={NavLink} variant="h6" sx={{ flexGrow: 1, textDecoration: 'none' }}>
            Quote Central
          </Typography>
          <Button to="/" color="inherit" component={NavLink}>Quotes</Button>
          <Button to="/new-quote" color="inherit" component={NavLink}>Submit new quote</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;