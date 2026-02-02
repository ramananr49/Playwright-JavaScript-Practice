import { expect, test } from "@playwright/test";
import { parseEnv } from "node:util";

test("Handling Multi Select Element related scenario in PW_JS", async ({page}, testInfo) => {
    await page.goto("https://letcode.in");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Multi-Select"]')).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Multi-Select"]/parent::header/following-sibling::div//p');
    await expect(alert_content).toContainText(" Be a multi-tasker ");
    await page.locator('a[href="/selectable"]').scrollIntoViewIfNeeded();
    await page.locator('a[href="/selectable"]').click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);
    const options_ele = await page.locator('[class="list-container"] [class="ng-star-inserted"]');
    const count = await options_ele.count();
    // await options_ele.first().waitFor({state: "visible", timeout: 3000});
    for (let i=0; i<count; i++) {
        await page.waitForTimeout(2000);
        await options_ele.nth(i).click();
        await page.waitForTimeout(2000);
    }

    const ss = await page.screenshot();
    testInfo.attach("Screenshot", {
        body: ss,
        contentType: 'image/png'
    });
})