import { expect, test } from "@playwright/test";

test("Handling Alerts related scenario in PW_JS", async ({page}) => {
    await page.goto("https://letcode.in/");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Alert"]')).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Alert"]/parent::header/following-sibling::div//p');
    await expect(alert_content).toContainText(" Interact with different types of dialog boxes ");
    await page.locator('a[href="/alert"]').click();
    
    //Simple Alert
    page.once("dialog", async dialog => {
        console.log(dialog.message());
        await dialog.accept();
    })
    await page.locator('#accept').click();
    await page.waitForTimeout(5000);

    //Confirm Alert 
    page.once('dialog', async dialog => {
        console.log(await dialog.message());
        await dialog.dismiss();
    })
    await page.locator('#confirm').click();

    //Prompt Alert
    page.once("dialog", async dialog => {
        await dialog.accept("Ramanan Ramasamy");
    })
    await page.locator('#prompt').click();
    await expect(page.locator('#myName')).toHaveText('Your name is: Ramanan Ramasamy');

    //Modern Alert
    await page.locator("#modern").click();
    const content = await page.locator('p[class="title"]').textContent();
    await expect(content).toEqual("Modern Alert - Some people address me as sweet alert as well ");
    await page.locator('button[aria-label="close"]').click();
    await expect(page.locator('p[class="title"]')).not.toBeVisible();
})