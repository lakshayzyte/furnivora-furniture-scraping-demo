// src/utils/captchaLogic.js

const STORAGE_KEY = 'furnivora_captcha_passed_v1';
const TTL_MS = 50 * 60 * 1000; // 5 minutes
const RANDOM_FORCE_PERCENT = 60; // 6% chance

export const checkCaptchaStatus = () => {
  try {
    // 1. Check if randomness forces a check
    // We do this FIRST so it overrides a valid token
    const isRandomCheck = Math.random() * 100 < RANDOM_FORCE_PERCENT;
    if (isRandomCheck) {
      return false; // "false" means NOT verified (show captcha)
    }

    // 2. Check Local Storage
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false; // No token found

    const ts = Number(raw);
    if (!ts || Number.isNaN(ts)) return false; // Invalid token

    // 3. Check Expiry
    const isValid = (Date.now() - ts) < TTL_MS;
    return isValid; // Returns true if valid, false if expired

  } catch (err) {
    return false; // Fail safe: show captcha on error
  }
};

export const setCaptchaVerified = () => {
  localStorage.setItem(STORAGE_KEY, String(Date.now()));
};