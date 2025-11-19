import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '../data/products';
import {
  Typography, Container, Box, Grid, Card, CardMedia, Button,
  Rating, Chip, Divider, List, ListItem, ListItemText
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const ProductDetail = () => {
  const { productSlug } = useParams();
  const product = getProductBySlug(productSlug);

  if (!product) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4">Product not found</Typography>
          <Button component={Link} to="/" startIcon={<ArrowBack />}>
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Button component={Link} to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`} startIcon={<ArrowBack />} sx={{ mb: 2 }}>
          Back to {product.category}
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="div"
                sx={{
                  height: 400,
                  bgcolor: 'grey.300',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Product Image
                </Typography>
              </CardMedia>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom>
              {product.name}
            </Typography>

            <Typography variant="h5" color="text.secondary" gutterBottom>
              by {product.brand}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} readOnly precision={0.1} size="large" />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {product.rating} ({product.reviews} reviews)
              </Typography>
            </Box>

            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
              ${product.price}
            </Typography>

            <Chip
              label={product.inStock ? 'In Stock' : 'Out of Stock'}
              color={product.inStock ? 'success' : 'error'}
              sx={{ mb: 3 }}
            />

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Product Details
            </Typography>

            <List dense>
              <ListItem>
                <ListItemText primary="Category" secondary={product.category} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Material" secondary={product.material} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Color" secondary={product.color} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Dimensions" secondary={product.dimensions} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Product ID" secondary={`#${product.id}`} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetail;