/**
 * ci.commands.js
 *
 * CI-resilient custom commands for handling environments where the target
 * site (practicesoftwaretesting.com) blocks or throttles GitHub Actions IP
 * ranges with a 403 Forbidden response.
 *
 * Usage: Replace `cy.visit(url)` with `cy.safeVisit(url)` wherever a page
 * load might be blocked in CI. The command retries up to `maxAttempts` times
 * with a delay between attempts before failing the test.
 */

/**
 * cy.safeVisit(url, options)
 *
 * A wrapper around cy.visit that:
 *  - Uses failOnStatusCode: false so a 403 doesn't immediately crash
 *  - Checks whether the loaded page is a real page or a block page
 *  - Reloads up to maxAttempts times if blocked
 *
 * @param {string} url - Relative or absolute URL to visit
 * @param {object} options - Optional cy.visit options (merged with defaults)
 * @param {number} maxAttempts - How many times to retry on 403 (default: 3)
 * @param {number} retryDelayMs - Milliseconds to wait between retries (default: 5000)
 */
Cypress.Commands.add(
  "safeVisit",
  (url, options = {}, maxAttempts = 3, retryDelayMs = 5000) => {
    const visitOptions = {
      failOnStatusCode: false,
      timeout: 60000,
      ...options,
    };

    const attemptVisit = (attemptsLeft) => {
      cy.visit(url, visitOptions);

      cy.document().then((doc) => {
        const isBlocked =
          doc.title === "" ||
          doc.body.innerText.includes("403") ||
          doc.body.innerText.includes("Forbidden") ||
          doc.body.innerText.includes("Access Denied");

        if (isBlocked && attemptsLeft > 1) {
          cy.log(
            `⚠️  safeVisit: Blocked response detected (attempts left: ${attemptsLeft - 1}). Retrying in ${retryDelayMs}ms...`
          );
          cy.wait(retryDelayMs);
          attemptVisit(attemptsLeft - 1);
        } else if (isBlocked) {
          // Out of retries — log but continue so the test can fail meaningfully
          cy.log(
            `❌ safeVisit: Page still blocked after ${maxAttempts} attempts. Proceeding anyway.`
          );
        } else {
          cy.log(`✅ safeVisit: Page loaded successfully.`);
        }
      });
    };

    attemptVisit(maxAttempts);
  }
);
