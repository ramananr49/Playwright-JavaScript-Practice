import { expect, test } from "@playwright/test";

test("Handling Date Picker related scenario in PW_JS", async ({page}, testInfo) => {
    await page.goto("https://letcode.in");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Calendar"]')).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Calendar"]/parent::header/following-sibling::div//p');
    await expect(alert_content).toContainText(" My time is precious & your? ");
    await page.locator('a[href="/calendar"]').scrollIntoViewIfNeeded();
    await page.locator('a[href="/calendar"]').click();
    await page.waitForTimeout(2000);
    await expect(page.locator('h1[class^="title"]')).toBeVisible();
    const ss = await page.screenshot();
    testInfo.attach("Landing Screenshot", {
        body: ss,
        contentType: 'image/png',
    });

    await page.locator('[id="birthday"]').fill("2020-10-01");
    await expect(page.locator("p[class^='label']")).toHaveText("2020-10-01");

    const ss1 = await page.screenshot();
    testInfo.attach("Calender Text Screenshot", {
        body: ss1,
        contentType: 'image/png',
    });
})