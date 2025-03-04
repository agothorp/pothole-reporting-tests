import { test, expect } from '@playwright/test';
import testCases from './potholeTestData.json';

for (const data of testCases) {
    test(`Report a Pothole - ${data.councilName}`, async ({ page }) => {
        console.log(`🚀 Starting test for: ${data.councilName}`);

        // Step 1: Navigate to the Housing and Local Services page
        console.log("🌍 Navigating to the Housing and Local Services page...");
        await page.goto('https://www.gov.uk/browse/housing-local-services');
        await page.waitForTimeout(2000); // Allow page to load fully

        // Step 2: Conditionally accept cookies if displayed
        const acceptCookiesButton = page.locator('button[data-accept-cookies="true"]');
        if (await acceptCookiesButton.isVisible()) {
            console.log("✅ Accepting cookies...");
            await acceptCookiesButton.click();
        }

        // Step 3: Navigate through 'Streets, roads, pavements and buildings'
        await page.getByRole('link', { name: 'Streets, roads, pavements and buildings' }).click();
        await expect(page).toHaveTitle(/Streets, roads, pavements and buildings/);
        await page.waitForTimeout(2000);

        // Step 4: Click 'Report a pothole'
        await page.getByRole('link', { name: 'Report a pothole' }).click();
        await expect(page).toHaveTitle(/Report a pothole/);
        await page.waitForTimeout(2000);

        // Step 5: Enter postcode into the textbox
        console.log(`📌 Entering postcode: ${data.postcode}`);
        await page.fill('#postcode', data.postcode);

        // Step 6: Find local council
        await page.getByRole('button', { name: 'Find your local council' }).click();
        await page.waitForTimeout(2000);

        // Step 7: Verify matched council
        await expect(page.locator(`text=We’ve matched the postcode to ${data.councilName}`)).toBeVisible();

        // Step 8: Go to council website
		await page.getByRole('button', { name: `Go to ${data.councilName} website` }).click();
		await page.waitForTimeout(3000); // Give it a moment to transition
		const newUrl = page.url();
		expect(newUrl).toContain(data.finalUrlContains);

        // Step 9: Verify page heading on council site
        await expect(page.locator('h1')).toHaveText(data.finalHeading);

        console.log(`🎉 Test completed successfully for ${data.councilName}!`);
    });
}

