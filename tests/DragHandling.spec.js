import { expect, test } from "@playwright/test";

test("Handling Drag related scenario in PW_JS", async ({page})=>{
    await page.goto("https://letcode.in");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Drag"]')).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Drag"]/parent::header/following-sibling::div//p');
    await expect(alert_content).toContainText(" Drag me here and there ");
    await page.locator('a[href="/draggable"]').click();

    const box = await page.locator('[id="sample-box"]');
    const boundary = await page.locator('[class="example-boundary"]');

    await box.dragTo(boundary, {targetPosition: {x:100, y: 150}});

    await page.waitForTimeout(5000);
})