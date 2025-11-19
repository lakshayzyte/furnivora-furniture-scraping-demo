import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { getProductsByCategory } from '../data/products';
import {
  Typography, Grid, Card, CardContent, CardMedia, Button, Container, Box,
  Rating, Chip, Pagination, CircularProgress
} from '@mui/material';
import { SwapHoriz } from '@mui/icons-material';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const products = getProductsByCategory(categoryName);

  const initialNavigationType = location.pathname.includes('/scroll') ? 'scroll' : 'pagination';
  const [navigationType, setNavigationType] = useState(initialNavigationType);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 10;
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  useEffect(() => {
    const handleScroll = () => {
      if (navigationType === 'scroll' && window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
        if (visibleCount < products.length) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleCount(prevCount => prevCount + itemsPerPage);
            setIsLoading(false);
          }, 1000); // Simulate network delay
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationType, visibleCount, products.length]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const displayedProducts = useMemo(() => {
    if (navigationType === 'pagination') {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return products.slice(startIndex, startIndex + itemsPerPage);
    } else {
      return products.slice(0, visibleCount);
    }
  }, [navigationType, currentPage, products, visibleCount]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  const toggleNavigation = () => {
    const newNavType = navigationType === 'pagination' ? 'scroll' : 'pagination';
    setNavigationType(newNavType);
    setCurrentPage(1);
    setVisibleCount(itemsPerPage);
    if (newNavType === 'scroll') {
      navigate(`/category/${categorySlug}/scroll`);
    } else {
      navigate(`/category/${categorySlug}`);
    }
  };

  const ProductCard = ({ product }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="div"
        sx={{
          height: 200,
          bgcolor: 'grey.300',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Image Placeholder
        </Typography>
      </CardMedia>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem' }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.brand}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={product.rating} readOnly precision={0.1} size="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            ({product.reviews} reviews)
          </Typography>
        </Box>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
          ${product.price}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Chip
            label={product.inStock ? 'In Stock' : 'Out of Stock'}
            color={product.inStock ? 'success' : 'error'}
            size="small"
          />
        </Box>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          component={Link}
          to={`/product/${product.slug}`}
          variant="outlined"
          fullWidth
          size="small"
        >
          View Details
        </Button>
      </Box>
    </Card>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            {categoryName}
          </Typography>
          <Button
            variant="contained"
            startIcon={<SwapHoriz />}
            onClick={toggleNavigation}
          >
            {navigationType === 'pagination' ? 'Switch to Infinite Scroll' : 'Switch to Pagination'}
          </Button>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Showing {displayedProducts.length} of {products.length} products
        </Typography>

        <Grid container spacing={3}>
          {displayedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        {navigationType === 'scroll' && isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {navigationType === 'pagination' && totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default CategoryPage;