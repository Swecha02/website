# Forms Audit Report - Swecha Enterprises

## 1. Summary of Forms

| Form Name | Location | Fields | Backend Integration | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Contact Form** | `src/pages/ContactPage.jsx` | Name, Org, Email, Phone, Message | Supabase (`contact_submissions`), Edge Function | Working |
| **Quote Request** | `src/components/QuoteModal.jsx` | Name, Email, Phone, Message, Subject (hidden) | Supabase (`contact_submissions`), Edge Function | Working |
| **Catalogue Download** | `src/components/CatalogueDownloadModal.jsx` | Name, Email, Country Code, Mobile | Supabase (`catalogue_downloads`), Edge Function | Working |

---

## 2. Detailed Form Analysis

### A. Contact Form
* **Location:** `src/pages/ContactPage.jsx`
* **Input Fields:**
  * `name` (Text, Required)
  * `organization` (Text, Optional)
  * `email` (Email, Required)
  * `phone` (Tel, Optional)
  * `message` (Textarea, Required)
* **Validation Rules:** Relies entirely on native HTML5 validation (`required`, `type="email"`).
* **Backend Integration:**
  1. Inserts data into the `contact_submissions` Supabase table.
  2. Logs an event in the `form_submissions` table for analytics.
  3. Invokes the `send-contact-email` Supabase Edge Function.
* **Current Status:** Fully working. Error handling and success toast notifications are properly implemented. Loading states (`isSubmitting`) prevent double submissions.
* **Issues Identified:**
  * No strict validation on the phone number format.
* **Recommendations:**
  * Implement stricter frontend validation for phone numbers (e.g., regex pattern matching) similar to the Catalogue Download modal.

### B. Quote Request Form
* **Location:** `src/components/QuoteModal.jsx` (Triggered from `ProductsPage.jsx` and `App.jsx` layout)
* **Input Fields:**
  * `subject` (Hidden, dynamically populated based on context)
  * `name` (Text, Required)
  * `email` (Email, Required)
  * `phone` (Tel, Optional)
  * `message` (Textarea, Required)
* **Validation Rules:** Relies on native HTML5 validation (`required`, `type="email"`).
* **Backend Integration:**
  1. Inserts into the `contact_submissions` table. *Note: Since the table lacks a dedicated `subject` column, the subject is prepended to the `message` string.*
  2. Logs an event in the `form_submissions` table.
  3. Invokes the `send-contact-email` Edge Function (with `source: 'quote'`).
* **Current Status:** Fully working with proper loading states and toast notifications.
* **Issues Identified:**
  * Workaround used for storing the `subject` parameter by prepending it to the message body. 
* **Recommendations:**
  * Add a `subject` or `quote_category` column to the `contact_submissions` table (or create a dedicated `quote_requests` table) to store structured data instead of manipulating the message string.

### C. Catalogue Download Form
* **Location:** `src/components/CatalogueDownloadModal.jsx`
* **Input Fields:**
  * `name` (Text, Required)
  * `email` (Text, Required - but validated via JS regex)
  * `countryCode` (Select dropdown)
  * `mobileNumber` (Tel, Required)
* **Validation Rules:** Implements custom JavaScript validation via a `validate()` function:
  * Name must not be empty.
  * Email must match standard regex pattern.
  * Mobile number is strictly enforced to 10 digits (`/^\d{10}$/`).
* **Backend Integration:**
  1. Inserts into `catalogue_downloads` table.
  2. Logs an event in `form_submissions`.
  3. Asynchronously invokes `send-catalogue-notification` Edge Function without blocking the UI.
* **Current Status:** Fully working. Incorporates custom error messaging directly under fields (inline validation UI) alongside toast notifications.
* **Issues Identified:**
  * The `email` input uses `type="text"` rather than `type="email"`. Even though JS validates it, using `type="email"` improves mobile keyboard accessibility.
  * The PDF download URL is currently a placeholder (`href='#'`).
* **Recommendations:**
  * Change the email input type from `text` to `email`.
  * Replace the dummy `#` link with the actual URL pointing to the catalogue PDF in Supabase Storage.

---

## 3. General Architecture Review
* **`App.jsx`**: Properly contextualizes forms by threading a global `onGetQuoteClick` handler into headers and pages, unifying the quote modal experience without duplicating code.
* **`ProductsPage.jsx`**: correctly utilizes the global quote handler to dynamically set the hidden subject field for product inquiries.
* **`customSupabaseClient.js`**: Environment variables are standard and correctly referenced. 

**Overall Conclusion:** The forms follow a consistent pattern for backend integration (Insert -> Analytics -> Edge Function) and use loading states correctly. Applying custom validation (as seen in the Catalogue modal) globally to all forms would elevate data integrity.