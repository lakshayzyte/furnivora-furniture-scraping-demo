import { useState } from 'react'; // Import useState
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Header from './components/Header';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import Contact from './components/Contact';
import GlobalCaptcha from './components/GlobalCaptcha';

import { checkCaptchaStatus } from './utils/captchaLogic';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // Saddle brown for furniture theme
    },
    secondary: {
      main: '#D2691E', // Chocolate brown
    },
    background: {
      default: '#FAF9F6', // Cream background
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {

  // 1. INITIALIZE STATE:
  // We run checkCaptchaStatus() immediately. 
  // If it returns FALSE, "isVerified" starts as FALSE.
  const [isVerified, setIsVerified] = useState(() => checkCaptchaStatus());

  // 2. THE SECURITY GATE:
  // If not verified, we render ONLY the captcha. 
  // The rest of the app (Header, Routes, Products) is NOT in the DOM.
  if (!isVerified) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* When user solves it, set isVerified to TRUE */}
        <GlobalCaptcha onVerified={() => setIsVerified(true)} />
      </ThemeProvider>
    );
  }

  // 3. PROTECTED CONTENT:
  // This code only runs/renders AFTER verification.
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categorySlug" element={<CategoryPage />} />
        <Route path="/category/:categorySlug/scroll" element={<CategoryPage />} />
        <Route path="/product/:productSlug" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
