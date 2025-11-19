import React, { useEffect, useRef, useState } from 'react';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from 'react-simple-captcha';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Typography, Box 
} from '@mui/material';
import { setCaptchaVerified } from '../utils/captchaLogic';

// Component now accepts a prop to notify the parent
export default function GlobalCaptcha({ onVerified }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Initialize captcha engine
    try {
      loadCaptchaEnginge(6);
    } catch (err) {
      console.error("Captcha load error", err);
    }
  }, []);

  const handleValidate = (e) => {
    e.preventDefault();
    if (validateCaptcha(input)) {
      setCaptchaVerified(); // Save to local storage
      onVerified(); // TELL PARENT WE ARE DONE
    } else {
      setError('Captcha incorrect. Please try again.');
      setInput('');
      // Reload captcha on fail
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