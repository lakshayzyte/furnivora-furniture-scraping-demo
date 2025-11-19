import { Box, Container, Typography, Grid, Paper } from '@mui/material';

const Footer = () => {
  return (
    <Paper sx={{ mt: 8, py: 6, bgcolor: 'grey.100' }} component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom align="center">
              About Furnivora
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Discover premium furniture for every room in your home. We offer high-quality,
              stylish furniture at competitive prices with fast shipping and excellent customer service.
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, pt: 4, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025 Furnivora. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer;