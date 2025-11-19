import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton
} from '@mui/material';
import { Home, ShoppingCart, Menu as MenuIcon, ContactMail } from '@mui/icons-material';
import { categories } from '../data/products';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (category) => {
    handleMenuClose();
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    navigate(`/category/${slug}`);
  };

  return (
    <AppBar position="sticky" sx={{ top: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          Furnivora
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/" startIcon={<Home />}>
            Home
          </Button>
          
          <Button
            color="inherit"
            onClick={handleMenuOpen}
          >
            Categories
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {categories.map((category) => (
              <MenuItem key={category} onClick={() => handleCategoryClick(category)}>
                {category}
              </MenuItem>
            ))}
          </Menu>

          <Button color="inherit" component={RouterLink} to="/contact" startIcon={<ContactMail />}>
            Contact Us
          </Button>
          <Button color="inherit" startIcon={<ShoppingCart />}>
            Cart (0)
          </Button>
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={RouterLink} to="/" onClick={handleMenuClose}>Home</MenuItem>
            <MenuItem component={RouterLink} to="/contact" onClick={handleMenuClose}>Contact Us</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} onClick={() => handleCategoryClick(category)}>
                {category}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;