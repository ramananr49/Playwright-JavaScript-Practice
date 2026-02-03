import { expect, test } from "@playwright/test";

test("Handling Forms related scenario in PW_JS", async ({page}, testInfo) => {
    await page.goto("https://letcode.in");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Forms"]').first()).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Forms"]/parent::header/following-sibling::div//p').first();
    await expect(alert_content).toContainText(" Interact with everything ");
    await page.locator('a[href="/forms"]').scrollIntoViewIfNeeded();
    await page.locator('a[href="/forms"]').click();
    await page.waitForTimeout(2000);
    await expect(page.locator('h1[class^="title"]')).toBeVisible();
    const ss = await page.screenshot();
    testInfo.attach("Landing Screenshot", {
        body: ss,
        contentType: 'image/png',
    });

    await page.locator('[id="firstname"]').fill("firstName");
    await page.locator('[id="lasttname"]').fill("lastName");
    await page.locator('[id="email"]').click();
    await page.locator('[id="email"]').type("gmail.com");
    await page.locator('//*[@id="countrycode"]/following-sibling::div//select').selectOption({label: 'India (+91)'});
    await page.locator('[id="Phno"]').fill("8181445500");
    await page.locator('[id="Addl1"]').fill("2/678, North Street");

    await page.locator('[id="Addl2"]').fill("Malleshwaram, Bangalore");
    await page.locator('[id="state"]').fill("Karnataka");
    await page.locator('[id="postalcode"]').fill("560056");
    await page.locator('//label[@id="country"]/following-sibling::div//select').selectOption({value: 'India'});
    await page.locator('[id="Date"]').fill("2020-04-02");
    await page.locator('[id="male"]').check();
    await page.locator('//input[@type="checkbox"]').check();
    const ss1 = await page.screenshot();
    testInfo.attach("Before Submit Screenshot", {
        body: ss1,
        contentType: 'image/png',
    });
    await page.locator('//input[@type="submit"]').click();
    // await page.waitForTimeout(3000);

    const ss2 = await page.screenshot();
    testInfo.attach("After Submit Screenshot", {
        body: ss2,
        contentType: 'image/png',
    });
})