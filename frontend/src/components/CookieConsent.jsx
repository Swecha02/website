import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Same key/expiry that public/ga-init.js reads before loading Google Analytics.
const KEY = 'swecha_consent';
const MAX_AGE = 180 * 864e5; // ask again after ~6 months

const hasValidChoice = () => {
  try {
    const c = JSON.parse(localStorage.getItem(KEY));
    return Boolean(c && Date.now() - c.at < MAX_AGE);
  } catch {
    return false;
  }
};

export const resetConsent = () => {
  try { localStorage.removeItem(KEY); } catch { /* storage blocked */ }
  window.location.reload();
};

const CookieConsent = () => {
  const [open, setOpen] = useState(() => typeof window !== 'undefined' && !hasValidChoice());
  if (!open) return null;

  const choose = (choice) => {
    try { localStorage.setItem(KEY, JSON.stringify({ choice, at: Date.now() })); } catch { /* storage blocked */ }
    if (choice === 'accepted') window.loadGA?.();
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label="Professional use and cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
    >
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center gap-4">
        <p className="text-sm text-gray-700 leading-relaxed flex-1">
          This website is intended for healthcare professionals, hospitals and institutional buyers. Product
          information is not medical advice. We use cookies to understand how visitors use the site.{' '}
          <Link to="/privacy-policy" className="text-primary font-semibold hover:underline">Privacy Policy</Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <Button variant="outline" onClick={() => choose('declined')}>Decline</Button>
          <Button className="bg-secondary hover:bg-secondary-hover text-white hover:text-primary" onClick={() => choose('accepted')}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
