import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            color="inherit"
            component={NavLink}
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
            to="/"
          >
            Quote Central
          </Typography>
          <Button
            component={NavLink}
            to="/"
            color="inherit"
            sx={{ mr: 2 }}>
            Quotes
          </Button>
          <Button
            component={NavLink}
            to="/submit-quote"
            color="inherit">
            Submit New Quote
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;