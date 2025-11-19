// src/components/GlobalCaptcha.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from 'react-simple-captcha';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// storage key and TTL/random settings
const STORAGE_KEY = 'furnivora_captcha_passed_v1';
const TTL_MS = 5 * 60 * 1000; // 5 minutes
const RANDOM_FORCE_PERCENT = 60; // 60% chance to force captcha even if within TTL

/**
 * GlobalCaptcha (MUI Dialog)
 * - Shows on initial load unless localStorage key is set (with TTL)
 * - Re-shows randomly with RANDOM_FORCE_PERCENT even if TTL hasn't expired
 * - Ensures loadCaptchaEnginge runs only after the canvas is mounted
 * - Retries initialization a few times if necessary
 */
export default function GlobalCaptcha() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  // Helper: check TTL-based pass
  function hasPassed() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const ts = Number(raw);
      if (!ts || Number.isNaN(ts)) return false;
      return (Date.now() - ts) < TTL_MS;
    } catch (err) {
      return false;
    }
  }

  function setPassedNow() {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch (err) {
      // ignore storage errors
    }
  }

  function shouldForceRandom() {
    return Math.random() * 100 < RANDOM_FORCE_PERCENT;
  }

  // On mount: decide whether to show captcha
  useEffect(() => {
    // If user already passed within TTL, we might still randomly force a challenge
    if (hasPassed()) {
      if (shouldForceRandom()) {
        setOpen(true);
      }
      return;
    }
    // not passed or expired -> show captcha
    setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When dialog becomes visible, initialize captcha AFTER next paint so canvas exists
  useEffect(() => {
    if (!open) return;

    let mounted = true;
    let attempts = 0;

    const tryLoad = () => {
      attempts += 1;
      try {
        setTimeout(() => {
          try {
            loadCaptchaEnginge(6);
            // focus the input after a short delay (gives DOM time)
            setTimeout(() => {
              if (inputRef.current) inputRef.current.focus();
            }, 50);
          } catch (err) {
            if (attempts < 3 && mounted) {
              tryLoad();
            } else {
              // eslint-disable-next-line no-console
              console.error('Failed to initialize captcha after retries', err);
              setError('Captcha failed to load, please refresh the page.');
            }
          }
        }, 0);
      } catch (outerErr) {
        if (attempts < 3 && mounted) {
          tryLoad();
        } else {
          // eslint-disable-next-line no-console
          console.error('Failed to schedule captcha init', outerErr);
          setError('Captcha initialization error. Please reload.');
        }
      }
    };

    tryLoad();

    return () => {
      mounted = false;
    };
  }, [open]);

  function handleValidate(e) {
    e.preventDefault();
    setError('');
    try {
      const isValid = validateCaptcha(input);
      if (isValid) {
        // store timestamp so captcha is valid for TTL_MS
        setPassedNow();
        setOpen(false);
        setInput('');
      } else {
        setError('Captcha does not match. Please try again.');
        setInput('');
        // validateCaptcha reloads the captcha on failure internally
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Captcha validation error', err);
      setError('Captcha validation failed, please try again.');
      setInput('');
      // attempt to reload
      try {
        loadCaptchaEnginge(6);
      } catch (ignore) {}
    }
  }

  function handleClose() {
    // Keep modal open unless user passed captcha — enforced by not calling setOpen(false)
  }

  // If already passed (within TTL), do not render the modal (unless random forced earlier)
  if (hasPassed() && !open) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="furnivora-captcha-title"
      disableEscapeKeyDown
      // prevent closing by clicking backdrop
      PaperProps={{ sx: { p: 2, borderRadius: 2, width: { xs: '92%', sm: 420 } } }}
    >
      <DialogTitle id="furnivora-captcha-title">Welcome to Furnivora! Verify to continue</DialogTitle>

      <DialogContent dividers>
        <Typography variant="body2" sx={{ mb: 2 }}>
          To ensure a smooth browsing experience, please complete this quick CAPTCHA.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <LoadCanvasTemplateNoReload />
        </Box>

        <form id="furnivora-captcha-form" onSubmit={handleValidate}>
          <TextField
            inputRef={inputRef}
            autoFocus
            fullWidth
            label="Enter captcha"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="outlined"
            size="small"
            inputProps={{ 'aria-label': 'captcha-input' }}
          />
        </form>

        {error && (
          <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button type="submit" form="furnivora-captcha-form" variant="contained" color="primary">
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
}
