import { expect, test } from "@playwright/test";

test("Handling Sort Element related scenario in PW_JS", async ({page}) => {
    await page.goto("https://letcode.in");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Sort"]')).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Sort"]/parent::header/following-sibling::div//p');
    await expect(alert_content).toContainText(" Sort out the problem quickly ");
    await page.locator('a[href="/sortable"]').scrollIntoViewIfNeeded();
    await page.locator('a[href="/sortable"]').click();
    await page.waitForLoadState("networkidle");

    const element_count = await page.locator('[id="cdk-drop-list-0"] [id="sample-box1"]').count();

    console.log(element_count);
    const source = await page.locator('[id="cdk-drop-list-0"] [id="sample-box1"]');
    const target = await page.locator('[id="cdk-drop-list-1"] [id="sample-box1"]');

    for (let i =0; i<element_count; i++) {
        console.log("I am inside WHile Loop");
        const targetBox = await target.last().boundingBox();
        const sourceBox = await source.first().boundingBox();
        // await page.waitForTimeout(2000);
        // await page.mouse.move((sourceBox.x + sourceBox.width)/2, (sourceBox.y+sourceBox.height)/2);
        // await page.mouse.down();
        // await page.mouse.move((targetBox.x + targetBox.width)/2, (targetBox.y + targetBox.height)/2, { steps: 30 });
        // await page.mouse.up();
        // await page.waitForTimeout(2000);
        await source.first().dragTo(target.last());
        await page.waitForTimeout(2000);
    }
})