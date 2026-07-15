const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = body.error || message;
    } catch (_) {
      // response wasn't JSON, keep default message
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

// ---- Analytics tracking (fire-and-forget, never throws) ----

export function trackPageVisit(pageName) {
  request('/api/track/page-visit', {
    method: 'POST',
    body: JSON.stringify({ page_name: pageName }),
  }).catch((err) => console.warn('Analytics Error:', err));
}

export function trackButtonClick(buttonName) {
  request('/api/track/button-click', {
    method: 'POST',
    body: JSON.stringify({ button_name: buttonName }),
  }).catch((err) => console.warn('Analytics Error:', err));
}

// ---- Forms ----

export function submitContact(formData) {
  return request('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
}

export function submitQuote(formData) {
  return request('/api/quote', { method: 'POST', body: JSON.stringify(formData) });
}

export function submitCatalogueDownload(formData) {
  return request('/api/catalogue-download', { method: 'POST', body: JSON.stringify(formData) });
}

// ---- Admin auth ----

export function adminLogin(email, password) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function adminLogout() {
  return request('/api/auth/logout', { method: 'POST' });
}

export function checkAdminAuth() {
  return request('/api/auth/me');
}

// ---- Analytics reads (admin dashboard) ----

function toQuery(startDate, endDate, extra = {}) {
  const params = new URLSearchParams({
    start: startDate.toISOString(),
    end: endDate.toISOString(),
    ...extra,
  });
  return params.toString();
}

export function getPageVisitCount(startDate, endDate, pageName) {
  const query = toQuery(startDate, endDate, pageName ? { page_name: pageName } : {});
  return request(`/api/analytics/page-visits/count?${query}`).then((r) => r.count);
}

export function getPageVisits(startDate, endDate) {
  return request(`/api/analytics/page-visits?${toQuery(startDate, endDate)}`);
}

export function getButtonClicks(startDate, endDate) {
  return request(`/api/analytics/button-clicks?${toQuery(startDate, endDate)}`);
}

export function getFormSubmissions(startDate, endDate) {
  return request(`/api/analytics/form-submissions?${toQuery(startDate, endDate)}`);
}

export function getFormSubmissionCount(startDate, endDate) {
  return request(`/api/analytics/form-submissions/count?${toQuery(startDate, endDate)}`).then((r) => r.count);
}

export function getCatalogueDownloadCount(startDate, endDate) {
  return request(`/api/analytics/catalogue-downloads/count?${toQuery(startDate, endDate)}`).then((r) => r.count);
}

// ---- Admin: submissions (contact/quote messages + catalogue downloads) ----

export function getContactSubmissions() {
  return request('/api/admin/submissions/contact');
}

export function getCatalogueDownloads() {
  return request('/api/admin/submissions/catalogue');
}

export function deleteContactSubmission(id) {
  return request(`/api/admin/submissions/contact/${id}`, { method: 'DELETE' });
}

export function deleteCatalogueDownload(id) {
  return request(`/api/admin/submissions/catalogue/${id}`, { method: 'DELETE' });
}
