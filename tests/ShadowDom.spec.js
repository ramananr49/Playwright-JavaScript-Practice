import { expect, test } from "@playwright/test";

test ("Handling Shadow Dom related scenario in PW_JS", async ({page}, testInfo)=> {
    await page.goto("https://letcode.in");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Shadow"]')).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Shadow"]/parent::header/following-sibling::div//p');
    await expect(alert_content).toContainText(" Shadow never leaves us alone ");
    await page.locator('a[href="/shadow"]').scrollIntoViewIfNeeded();
    await page.locator('a[href="/shadow"]').click();
    await page.waitForTimeout(2000);
    await expect(page.locator('h1[class^="title"]')).toBeVisible();
    const ss = await page.screenshot();
    testInfo.attach("Landing Screenshot", {
        body: ss,
        contentType: 'image/png',
    });

    const shadowDom = page.locator('#open-shadow');
    await shadowDom.locator('[id="fname"]').fill("Hemanth");
    // await page.locator('[id="lname"]').fill("Kumar");
    // await page.locator('[id="email"]').fill("sampleHM@gmail.com");

    /*
    Why your Playwright test fails
    Playwright cannot access closed Shadow DOM — this is a browser platform restriction, not a Playwright bug.
    Summary (TL;DR)
    Element	    Shadow mode	            Playwright access
    #fname	    Light DOM	            ✅ Works
    #lname	    Closed Shadow DOM	    ❌ Impossible
    #email	    Closed Shadow DOM	    ❌ Impossible

    Root cause: closed shadow roots
    Result: locator timeout
    Fix: test behavior or get dev support — no Playwright-side workaround exists
    */

    const ss1 = await page.screenshot();
    testInfo.attach("Completetion Screenshot", 
        {
            body: ss1,
            contentType: 'image/png',
        }
    )
})