import { expect, test } from "@playwright/test";
import { sourceMapsEnabled } from "node:process";

test("Handling Drop related scenario in PW_JS", async ({page}, testInfo) => {
    await page.goto("https://letcode.in");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Drop"]')).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Drop"]/parent::header/following-sibling::div//p');
    await expect(alert_content).toContainText(" Feel free to bounce me ");
    await page.locator('a[href="/droppable"]').click();

    const sorce = await page.locator('[id="draggable"]');
    const target = await page.locator('[id="droppable"]');

    // await page.dragAndDrop(sorce, target);
    // await page.dragAndDrop('[id="draggable"]', '[id="droppable"]');
    // await sorce.dragTo(target);
    const sourceBox = await sorce.boundingBox();
    const targetBox = await target.boundingBox();

    await page.mouse.move((sourceBox.x+sourceBox.width)/2, (sourceBox.y+sourceBox.height)/2);
    await page.mouse.down();
    await page.mouse.move((targetBox.x+targetBox.width)/2, (targetBox.y+targetBox.height)/2);
    await page.mouse.up();


    const ss = await page.screenshot();
    testInfo.attach("screenshot of drag and drop", {
        body: ss,
        contentType: 'image/png',
    })
    await page.waitForTimeout(5000);
})