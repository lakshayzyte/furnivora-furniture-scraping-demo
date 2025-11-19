import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import { Typography, Grid, Card, CardContent, CardMedia, Button, Container, Box } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Welcome to Furnivora
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Discover premium furniture for every room in your home
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6, mb: 4 }}>
          Shop by Category
        </Typography>

        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 140,
                    bgcolor: 'grey.300',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    {category}
                  </Typography>
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Explore our collection of {category.toLowerCase()} furniture
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    component={Link}
                    to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    variant="contained"
                    fullWidth
                  >
                    Shop {category}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;