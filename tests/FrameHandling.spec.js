import { expect, test } from "@playwright/test";

test("Handling Frame related scenario in PW_JS", async ({page}, testInfo) => {
    await page.goto("https://letcode.in/");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Frame"]')).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Frame"]/parent::header/following-sibling::div//p');
    await expect(alert_content).toContainText(" Interact with different types of frames/iframes ");
    await page.locator('a[href="/frame"]').click();
    await expect(page.frameLocator('#firstFr').locator('h1[class="title"]')).toHaveText("Enter Details");
    await page.frameLocator('#firstFr').locator('input[name="fname"]').click();
    await page.frameLocator('#firstFr').locator('input[name="fname"]').fill("Rahul");
    await page.frameLocator('#firstFr').locator('input[name="lname"]').click();
    await page.frameLocator('#firstFr').locator('input[name="lname"]').fill("Sharma");
    const email_Element = await page.frameLocator('#firstFr').frameLocator('iframe[src="innerframe"]').locator('input[name="email"]');
    await email_Element.fill("Rahul.Sharma@gmail.com");
    const ss = await page.screenshot();
    await testInfo.attach("First Name Field SS", {
        body: ss,
        contentType: 'image/png',
    });

})