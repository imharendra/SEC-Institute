import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg'; // Adjust the path as necessary

const navItems = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT US', path: '/about' },
  { label: 'CONTACT US', path: '/contact' },
  { label: 'STUDENT VERIFICATION', path: '/studentverify' },
  { label: 'COURSE', path: '/courses' },
  { label: 'OUR BRANCHES', path: '/branches' },
  { label: 'ONLINE LEARNING', path: '/online-learning' },
  { label: 'REGISTER STUDENT', path: '/registerstudent' },
];

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
      <AppBar position="static" color="default">
      <Container maxWidth="xl" className='bgcolor-rosewater'>
        <Box display="flex" justifyContent="center" py={2} flexDirection={isMobile ? 'column' : 'row'}>
          <Box display="flex" alignItems="center">
            <img src={logo} alt="SECI Logo" style={{ height: 60, marginRight: 10 }} />
            <Box textAlign={isMobile ? 'center' : 'left'}>
              <Typography variant="h6">SOMNATH EDUCATION & COMPUTER INSTITUTE</Typography>
              <Typography variant="body2">WWW.SECINSTITUTE.IN</Typography>
            </Box>
          </Box>

          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ position: 'absolute', right: 16, top: 50 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        <Divider />

        {!isMobile ? (
          <Box display="flex" justifyContent="space-between" flexWrap="wrap" alignItems="center" py={1}>
            <Box display="flex" flexWrap="wrap">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  sx={{ mx: 0.5 }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
          </Box>
        ) : (
          <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
            <Box sx={{ width: 250 }} onClick={toggleDrawer}>
              <List>
                {navItems.map((item) => (
                  <ListItem button component={Link} to={item.path} key={item.label}>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
                <ListItem button component={Link} to="/login">
                  <ListItemText primary="Login" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        )}
      </Container>
    </AppBar>
  );
}