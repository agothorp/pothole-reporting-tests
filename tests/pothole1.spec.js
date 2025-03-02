import { test, expect } from '@playwright/test';

test('Report a Pothole Form Test - Westminster Council', async ({ page }) => {
    console.log("🚀 Starting test: Report a Pothole - Westminster Council");

    // Step 1: Navigate to the Housing and Local Services page
    console.log("🌍 Navigating to the Housing and Local Services page...");
    await page.goto('https://www.gov.uk/browse/housing-local-services');
    await page.waitForTimeout(2000); // Allow page to load fully

    // Step 2: Conditionally accept cookies if displayed
    console.log("🔍 Checking for cookie consent banner...");
    const acceptCookiesButton = page.locator('button[data-accept-cookies="true"]');
    if (await acceptCookiesButton.isVisible()) {
        console.log("✅ Accepting cookies...");
        await acceptCookiesButton.click();
    } else {
        console.log("✅ No cookie banner detected, continuing...");
    }

    // Step 3: Click on "Streets, roads, pavements and buildings"
    console.log("🔍 Selecting 'Streets, roads, pavements and buildings' link...");
    await page.waitForTimeout(1000); // Short wait before interacting
    await page.getByRole('link', { name: 'Streets, roads, pavements and buildings' }).click();

    // Step 4: Wait for navigation and verify page title
    console.log("✅ Navigated to 'Streets, roads, pavements and buildings' page!");
    await expect(page).toHaveTitle(/Streets, roads, pavements and buildings/);
    await page.waitForTimeout(2000);

    // Step 5: Click on "Report a pothole" link
    console.log("🔍 Selecting 'Report a pothole' link...");
    await page.getByRole('link', { name: 'Report a pothole' }).click();

    // Step 6: Wait for navigation and verify page title
    console.log("🔍 Verifying page title...");
    await expect(page).toHaveTitle(/Report a pothole/);
    console.log("✅ Page title verified!");
    await page.waitForTimeout(2000);

    // Step 7: Enter Westminster postcode
    console.log("📌 Entering Westminster postcode: SW1A 1AA...");
    await page.fill('#postcode', 'SW1A 1AA');
    console.log("✅ Postcode entered successfully!");
    await page.waitForTimeout(1000);

    // Step 8: Click the 'Find' button
    console.log("🔍 Clicking the 'Find your local council' button...");
    await page.getByRole('button', { name: 'Find your local council' }).click();
    console.log("✅ Button clicked!");
    await page.waitForTimeout(2000);

    // Step 9: Verify that the correct council has been matched
    console.log("🔍 Checking that the postcode matches City of Westminster...");
    await expect(page.locator('text=We’ve matched the postcode to City of Westminster')).toBeVisible();
    console.log("✅ Postcode matched correctly!");
    await page.waitForTimeout(2000);

    // Step 10: Click on "Go to Westminster Council website" link
    console.log("🔍 Clicking the 'Go to City of Westminster website' button...");
    await page.getByRole('button', { name: 'Go to City of Westminster website' }).click();
    console.log("✅ Redirecting to Westminster Council website...");

    // Step 11: Wait for navigation to Westminster Council's site
    await page.waitForNavigation({ waitUntil: 'load' });
    const newUrl = page.url();
    console.log(`🔍 Current URL: ${newUrl}`);
    expect(newUrl).toContain('westminster.gov.uk');
    console.log("✅ Successfully navigated to Westminster Council website!");
	await page.waitForTimeout(2000);
	
    // Step 12: Assert the presence of the heading "Report a road damage issue"
    console.log("🔍 Checking for 'Report a road damage issue' heading...");
    await expect(page.locator('h1')).toHaveText('Report a road damage issue');
    console.log("✅ Heading verified: 'Report a road damage issue' is visible!");

    console.log("🎉 Test completed successfully!");
});

