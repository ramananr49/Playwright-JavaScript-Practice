import { expect, test } from "@playwright/test";

test("Handling Waits related scenario in PW_JS", async ({page}, testInfo) => {
    await page.goto("https://letcode.in");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Waits"]')).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Waits"]/parent::header/following-sibling::div//p');
    await expect(alert_content).toContainText(" It's ok to wait but you know.. ");
    await page.locator('a[href="/waits"]').scrollIntoViewIfNeeded();
    await page.locator('a[href="/waits"]').click();
    await page.waitForTimeout(2000);
    await expect(page.locator('h1[class^="title"]')).toBeVisible();
    const ss = await page.screenshot();
    testInfo.attach("Landing Screenshot", {
        body: ss,
        contentType: 'image/png',
    });

    // page.once("dialog", async (dialog)=>{
    //     console.log(await dialog.message());
    //     const ss1 = await page.screenshot();
    //     testInfo.attach("Alert Screenshot", {
    //         body: ss1,
    //         contentType: 'image/png',
    //     });
    //     await dialog.accept();
    // })
    const dialofPromise = page.waitForEvent("dialog");
    await page.locator('[id="accept"]').click();

    const dialog = await dialofPromise;

    console.log(dialog.message());
    // const ss1 = await page.screenshot();
    // testInfo.attach("Alert Screenshot", {
    //     body: ss1,
    //     contentType: 'image/png',
    // });
    await dialog.accept();

})