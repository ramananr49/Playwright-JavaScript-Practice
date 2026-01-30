import { expect, test } from "@playwright/test";

test("Handling Window related scenario in PW_JS", async ({page, context}) => {
    await page.goto("https://letcode.in/");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Window"]')).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Window"]/parent::header/following-sibling::div//p');
    await expect(alert_content).toContainText(" Switch different types of tabs or windows ");
    await page.locator('a[href="/window"]').click();

    //Verify the URL
    const beforeURL = await page.url();
    console.log(beforeURL);
    const [newTab] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('[id="home"]').click(),
    ])
    await newTab.waitForLoadState();
    const afterURL = await newTab.url();
    console.log(afterURL);
    console.log(await newTab.title());

    await newTab.close();
    console.log("***************************************")

    const multiWindowBtn = page.locator('[id="multi"]');
    
    const pages = [];

    page.on('popup', (popup) => {
        pages.push(popup);
    });

    await multiWindowBtn.click();
    await page.waitForLoadState();
    await page.waitForTimeout(4000);

    console.log(`Total pages count is : ${await pages.length}`);

    for (let p of pages) {
        await p.waitForLoadState();
        console.log(`Title : ${await p.title()}`);
        console.log(`URL : ${await p.url()}`);
    }

    await pages[0].bringToFront();
    await expect(pages[0].locator("h1[class*='title']")).toHaveText("Alert");
    await pages[0].close();

    await pages[1].bringToFront();
    await expect(pages[1].locator("h1[class*='title']")).toHaveText("Dropdown");
    await pages[1].close();

    await page.bringToFront();
    await expect(page.locator("h1[class*='title']")).toHaveText("Windows");
    await page.waitForTimeout(5000);
})