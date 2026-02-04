import { expect, test } from "@playwright/test";

test("Handling Advance web Table related scenario in PW_JS", async ({page}, testInfo) => {
    await page.goto("https://letcode.in");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Table"]').last()).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Table"]/parent::header/following-sibling::div//p').last();
    await expect(alert_content).toContainText(" It's little complicated but give a try ");
    await page.locator('a[href="/advancedtable"]').scrollIntoViewIfNeeded();
    await page.locator('a[href="/advancedtable"]').click();
    await page.waitForTimeout(2000);
    await expect(page.locator('h1[class^="title"]')).toBeVisible();
    const ss = await page.screenshot();
    testInfo.attach("Landing Screenshot", {
        body: ss,
        contentType: 'image/png',
    });

    //Validate the Records per page functionality
    const defultVal = await page.locator('select[aria-controls="advancedtable"]').inputValue();
    const rowElement = await page.locator('table[id="advancedtable"] tbody > tr');
    await expect(await rowElement.count()).toEqual(parseInt(defultVal));

    //Select 10 and Verify the record count in table
    await page.locator('select[aria-controls="advancedtable"]').selectOption({label: "10"});
    await page.waitForTimeout(1000);
    const currentVal = await page.locator('select[aria-controls="advancedtable"]').inputValue();
    await expect(await rowElement.count()).toEqual(parseInt(currentVal));

    //Select 25 and Verify the record count in table
    await page.locator('select[aria-controls="advancedtable"]').selectOption({value: "25"});
    await page.waitForTimeout(1000);
    const currentVal1 = await page.locator('select[aria-controls="advancedtable"]').inputValue();
    await expect(await rowElement.count()).toEqual(parseInt(currentVal1));

    //Switch back to default value
    await page.locator('select[aria-controls="advancedtable"]').selectOption({value: "5"});
    await page.waitForTimeout(1000);
    const searchField = await page.locator('input[id^="dt-search"]');
    await expect(searchField).toBeVisible();
    await searchField.click();
    await page.locator('input[id^="dt-search"]').fill('newport');
    await expect(await rowElement.count()).toEqual(2);
    const ss1 = await page.screenshot();
    testInfo.attach("Search Field with Data SS", {
        body: ss1,
        contentType: 'image/png',
    })
    await page.locator('input[id^="dt-search"]').clear();
    await expect(await rowElement.count()).toEqual(5);
    const ss2 = await page.screenshot();
    testInfo.attach("Search Field cleared Data SS", {
        body: ss2,
        contentType: 'image/png',
    })

    //Verify the Pagination functionality
    const firstArrowElement = await page.locator('button[aria-label="First"]');
    const previousArrowElement = await page.locator('button[aria-label="Previous"]');
    const nextArrowElement = await page.locator('button[aria-label="Next"]');
    const lastArrowElement = await page.locator('button[aria-label="Last"]');
    const pageNumber = await page.locator('button[aria-current="page"]');

    const initialPageNumber = await pageNumber.textContent();
    await lastArrowElement.click();
    const lastPageNumber = await pageNumber.textContent();
    await firstArrowElement.click();

    for(let i=0; i<parseInt(lastPageNumber); i++) {
        console.log(i+1)
        if ( i === 0) {
            await expect(firstArrowElement).toBeDisabled();
            await expect(previousArrowElement).toBeDisabled();
            await expect(pageNumber).toHaveText("1");
            await expect(nextArrowElement).toBeEnabled();
            await expect(lastArrowElement).toBeEnabled();
            await nextArrowElement.click();
        }
        else if( i+1 === parseInt(lastPageNumber)) {
            await expect(firstArrowElement).toBeEnabled();
            await expect(previousArrowElement).toBeEnabled();
            await expect(pageNumber).toHaveText("10");
            await expect(nextArrowElement).toBeDisabled();
            await expect(lastArrowElement).toBeDisabled();
        }
        else {
            await expect(firstArrowElement).toBeEnabled();
            await expect(previousArrowElement).toBeEnabled();
            await expect(pageNumber).toHaveText(String(i+1));
            await expect(nextArrowElement).toBeEnabled();
            await expect(lastArrowElement).toBeEnabled();
            await nextArrowElement.click();
        }
         
    }
})