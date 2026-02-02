import { expect, test } from "@playwright/test";

test("Handling Slider Element related scenario in PW_JS", async ({page}, testInfo) => {
    await page.goto("https://letcode.in");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Slider"]')).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Slider"]/parent::header/following-sibling::div//p');
    await expect(alert_content).toContainText(" Hmm.. Can you slide me? ");
    await page.locator('a[href="/slider"]').scrollIntoViewIfNeeded();
    await page.locator('a[href="/slider"]').click();
    await expect(page.locator('h1[class^="title"]')).toBeVisible();
    const ss = await page.screenshot();
    testInfo.attach("Landing Screenshot", {
        body: ss,
        contentType: 'image/png',
    });

    await page.locator('[id="generate"]').fill("12");
    await page.locator('button[class^="button"]').click();
    await expect(page.locator('[class^="notification"]')).toBeVisible();
    await page.waitForTimeout(5000);

    const ss1 = await page.screenshot();
    testInfo.attach("result Screenshot", {
        body: ss1,
        contentType: 'image/png',
    });

    const result = await page.locator('p[class="has-text-primary-light"]').textContent();

    let resultSet = result.split("-");
    resultSet = resultSet.map(x => x.trim());
    await expect(resultSet.length).toEqual(12);
})