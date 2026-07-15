-- Swecha Enterprises website schema
-- Run this once against your Postgres database:
--   psql -U swecha_app -d swecha_website -f schema.sql

CREATE TABLE IF NOT EXISTS contact_submissions (
    id            BIGSERIAL PRIMARY KEY,
    name          TEXT NOT NULL,
    email         TEXT NOT NULL,
    phone         TEXT,
    organization  TEXT,
    message       TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS catalogue_downloads (
    id             BIGSERIAL PRIMARY KEY,
    name           TEXT NOT NULL,
    email          TEXT NOT NULL,
    country_code   TEXT,
    mobile_number  TEXT,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS form_submissions (
    id            BIGSERIAL PRIMARY KEY,
    form_name     TEXT NOT NULL,
    submitted_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS page_visits (
    id          BIGSERIAL PRIMARY KEY,
    page_name   TEXT NOT NULL,
    visited_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS button_clicks (
    id          BIGSERIAL PRIMARY KEY,
    button_name TEXT NOT NULL,
    clicked_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for the date-range queries the analytics dashboard runs constantly
CREATE INDEX IF NOT EXISTS idx_page_visits_visited_at ON page_visits (visited_at);
CREATE INDEX IF NOT EXISTS idx_button_clicks_clicked_at ON button_clicks (clicked_at);
CREATE INDEX IF NOT EXISTS idx_form_submissions_submitted_at ON form_submissions (submitted_at);
CREATE INDEX IF NOT EXISTS idx_catalogue_downloads_created_at ON catalogue_downloads (created_at);

-- Single admin account for the dashboard login (replaces the old client-side
-- password check, which shipped the password in plain text inside the built
-- JS bundle -- anyone could open devtools and read it).
CREATE TABLE IF NOT EXISTS admin_users (
    id             BIGSERIAL PRIMARY KEY,
    email          TEXT UNIQUE NOT NULL,
    password_hash  TEXT NOT NULL,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
