// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands'

/**
 * Override navigator.webdriver before every test.
 *
 * Cloudflare's bot-detection script checks `navigator.webdriver === true`
 * to identify automation. When it's true (the default in headless Chrome),
 * Cloudflare serves a JS challenge page instead of the real Angular app,
 * so `input[type="file"]` and other elements are never rendered in CI.
 *
 * Setting it to `undefined` makes the browser fingerprint match a real user,
 * allowing the Angular SPA to fully mount before tests run.
 */
Cypress.on('window:before:load', (win) => {
  Object.defineProperty(win.navigator, 'webdriver', {
    get: () => undefined,
    configurable: true,
  });
});