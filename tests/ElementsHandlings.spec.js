import { expect, test } from "@playwright/test";

test("Handling Elements related scenario in PW_JS", async ({page}) => {
    await page.goto("https://letcode.in");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Elements"]')).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Elements"]/parent::header/following-sibling::div//p');
    await expect(alert_content).toContainText(" Play with element and smash them ");
    await page.locator('a[href="/elements"]').click();

    //Elements Play
    await page.locator('[name="username"]').fill("Ramanan");
    await page.locator('[id="search"]').click();
    await expect(page.getByAltText('User avatar')).toBeVisible();
    await expect(page.locator("[class='media-content'] > p[class^='title']")).toHaveText("Ramanan Sankaran");
    await expect(page.locator('[class="media-content"] > p[class^="subtitle"]')).toHaveText(" Location not available ");
    await expect(page.locator('//p[normalize-space()="Public Repos"]/following-sibling::p')).toContainText('4');
    await expect(page.locator('//p[normalize-space()="Public Gists"]/following-sibling::p')).toContainText('0');
    await expect(page.locator('//p[normalize-space()="Followers"]/following-sibling::p')).toContainText('6');

    const repo_count = await page.locator('//p[normalize-space()="Public Repos"]/following-sibling::p').textContent();
    let intrepo = parseInt(repo_count)
    console.log(intrepo);
    const repo_names = await page.locator('a[class="has-text-link"]').allTextContents();
    
    for (const repo of repo_names) {
        console.log(repo);
    }

})