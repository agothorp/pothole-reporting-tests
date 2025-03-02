import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false,  // Ensure browser UI is visible
    slowMo: 1000,  // Slow down actions for debugging
    launchOptions: {
		      args: [
        '--window-position=-1100,100',  // adjusting window start position
		],
    },
  },
  testDir: './tests',
  workers: 2,  // Run up to 2 tests in parallel
});



