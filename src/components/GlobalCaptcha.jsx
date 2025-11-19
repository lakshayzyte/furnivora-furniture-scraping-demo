import React, { useEffect, useState } from 'react';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from 'react-simple-captcha';
import { 
  Dialog, DialogTitle, DialogContent, 
  Button, TextField, Typography, Box 
} from '@mui/material';
import { setCaptchaVerified } from '../utils/captchaLogic';

// Component now accepts a prop to notify the parent
export default function GlobalCaptcha({ onVerified }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // FIX: Wait 350ms for the Dialog to fully render in the DOM
    // before trying to draw the canvas.
    const timer = setTimeout(() => {
      try {
        loadCaptchaEnginge(6);
      } catch (err) {
        console.error("Captcha load error", err);
      }
    }, 350);

    // Cleanup timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  const handleValidate = (e) => {
    e.preventDefault();

    // Prevent validating if the user hasn't typed anything
    if (!input) {
      setError('Please enter the captcha characters.');
      return;
    }

    if (validateCaptcha(input)) {
      setCaptchaVerified(); // Save to local storage
      onVerified(); // TELL PARENT WE ARE DONE
    } else {
      setError('Captcha incorrect. Please try again.');
      setInput('');
      // Reload captcha on fail so user gets a new one
      try { loadCaptchaEnginge(6); } catch(e){} 
    }
  };

  // We render a full-screen blocking Dialog
  return (
    <Dialog 
      open={true} // Always open if this component is rendered
      disableEscapeKeyDown={true} // Cannot close with ESC
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { p: 2, borderRadius: 2 } }}
      // Remove "onClose" so clicking background does nothing
    >
      <DialogTitle>Security Check</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Please complete the captcha to access Furnivora.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <LoadCanvasTemplateNoReload />
        </Box>

        <form onSubmit={handleValidate}>
          <TextField
            autoFocus
            fullWidth
            label="Enter characters"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ mt: 2 }}
          >
            Verify
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}