import { expect, test } from "@playwright/test";

test("Handling Simple web Table related scenario in PW_JS", async ({page}, testInfo) => {
    await page.goto("https://letcode.in");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Table"]').first()).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Table"]/parent::header/following-sibling::div//p').first();
    await expect(alert_content).toContainText(" It's all about rows & columns ");
    await page.locator('a[href="/table"]').scrollIntoViewIfNeeded();
    await page.locator('a[href="/table"]').click();
    await page.waitForTimeout(2000);
    await expect(page.locator('h1[class^="title"]')).toBeVisible();
    const ss = await page.screenshot();
    testInfo.attach("Landing Screenshot", {
        body: ss,
        contentType: 'image/png',
    });

    const shoppingListPrices = await page.locator('//table[@id="shopping"]//tr/td[2]');
    const totalPrice = await page.locator('//table[@id="shopping"]//td/b');

    const count = await shoppingListPrices.count();
    let actTotal = 0;
    for (let i =0 ; i<count; i++) {
        let actPrice = await shoppingListPrices.nth(i).textContent();
        console.log(await shoppingListPrices.nth(i).textContent());
        actTotal += parseInt(actPrice);
    }
    await expect(actTotal).toEqual(parseInt(await totalPrice.textContent()));

    //Mark Raj as Present
    const firstNames = await page.locator('//table[@id="simpletable"]//tr/td[1]');
    const lastNames = await page.locator('//table[@id="simpletable"]//tr/td[2]');

    const fno = await firstNames.count();
    const lno = await lastNames.count();
    const markName = "Raj";
    const row_raj = 0;

    for(let i=0; i<fno; i++) {
        if (markName === await firstNames.nth(i).textContent()) {
            await firstNames.nth(i).locator('xpath=following-sibling::td/input').check();
        }
        else if(markName === await lastNames.nth(i).textContent()) {
            await lastNames.nth(i).locator('xpath=following-sibling::td/input').check();
        }
    }
    const ss1 = await page.screenshot();
    testInfo.attach("Mark Present Screenshot", {
        body: ss1,
        contentType: 'image/png',
    });
})