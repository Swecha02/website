// Google Analytics loads only after the visitor accepts the cookie bar
// (CookieConsent.jsx stores the choice under this key).
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.loadGA = function () {
  if (window.gaLoaded) return;
  window.gaLoaded = true;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-VNFRQRDWYS';
  document.head.appendChild(s);
  gtag('js', new Date());
  gtag('config', 'G-VNFRQRDWYS');
};
try {
  var c = JSON.parse(localStorage.getItem('swecha_consent'));
  if (c && c.choice === 'accepted' && Date.now() - c.at < 180 * 864e5) window.loadGA();
} catch (e) {}
