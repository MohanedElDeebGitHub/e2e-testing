import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    baseUrl: "https://practicesoftwaretesting.com",
    specPattern: ["cypress/e2e/**/*.cy.js", "cypress/e2e/**/*.feature"],
    // Retry failing tests in CI to handle transient 403/network blocks
    retries: {
      runMode: 2,  // retry up to 2 times in CI (cypress run)
      openMode: 0, // no retries in interactive mode
    },
    // Extend timeouts for slower CI network conditions
    pageLoadTimeout: 60000,
    defaultCommandTimeout: 10000,
    // Spoof request headers so the site treats the runner like a real browser
    experimentalModifyObstructiveThirdPartyCode: true,
    headers: {
      "Accept-Language": "en-US,en;q=0.9",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    },
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      /**
       * Defeat Cloudflare/bot-detection in headless CI.
       *
       * practicesoftwaretesting.com uses Cloudflare which fingerprints the
       * browser. Headless Chrome exposes navigator.webdriver=true and several
       * other automation signals that cause Cloudflare to serve an empty JS
       * challenge page instead of the real Angular app.
       *
       * These Chrome flags suppress those signals so the app fully renders.
       */
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome" || browser.name === "chromium") {
          // Mask the automation/headless fingerprint
          launchOptions.args.push("--disable-blink-features=AutomationControlled");
          launchOptions.args.push("--disable-web-security");
          launchOptions.args.push("--no-sandbox");
          launchOptions.args.push("--disable-dev-shm-usage");
          // Make headless mode indistinguishable from headed
          launchOptions.args.push("--headless=new");
          // Disable automation info bar
          launchOptions.args.push("--disable-infobars");
          // Set a realistic window size
          launchOptions.args.push("--window-size=1280,800");
          // Remove the "Chrome is being controlled by automated software" banner
          const idx = launchOptions.args.indexOf("--enable-automation");
          if (idx !== -1) launchOptions.args.splice(idx, 1);
        }
        return launchOptions;
      });

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});