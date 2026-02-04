import { expect, test } from "@playwright/test";

test("Handling Date Picker related scenario in PW_JS", async ({page}, testInfo) => {
    await page.goto("https://letcode.in");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="File"]')).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="File"]/parent::header/following-sibling::div//p');
    await expect(alert_content).toContainText(" All your data is secured! ");
    await page.locator('a[href="/file"]').scrollIntoViewIfNeeded();
    await page.locator('a[href="/file"]').click();
    await page.waitForTimeout(2000);
    await expect(page.locator('h1[class^="title"]')).toBeVisible();
    const ss = await page.screenshot();
    testInfo.attach("Landing Screenshot", {
        body: ss,
        contentType: 'image/png',
    });

    //Verify File Upload Scenario
    const chooseFileElement = await page.locator('input[type="file"]')
    const filePath = "resources/uploadFile.pdf";
    await chooseFileElement.setInputFiles(filePath);
    await expect(page.locator('p[class^="label"]')).toHaveText("Selected File: uploadFile.pdf");
    const ss1 = await page.screenshot();
    testInfo.attach("File upload Screenshot", {
        body: ss1,
        contentType: 'image/png',
    });
    
    //Verify File Download Scenario
    const excelDownloadBtn = page.locator('a[id="xls"]');
    const pdfDownloadBtn = page.locator('a[id="pdf"]');
    const textDonwloadBtn = page.locator('a[id="txt"]');

    //Excel Download Validation
    const downloadPromise = page.waitForEvent('download');
    await excelDownloadBtn.click();
    const downloadExcel = await downloadPromise;
    await expect(downloadExcel.suggestedFilename()).toBe('sample.xlsx');
    const path = await downloadExcel.path();
    await expect(path).not.toBeNull();
    await downloadExcel.saveAs('downloads/sample.xlsx');

    //PDF Download Validation
    const downloadPromise1 = page.waitForEvent('download');
    await pdfDownloadBtn.click();
    const downloadPDF = await downloadPromise1;
    await expect(downloadPDF.suggestedFilename()).toBe('sample.pdf');
    const path1 = await downloadPDF.path();
    await expect(path1).not.toBeNull();
    await downloadPDF.saveAs('downloads/sample.pdf');

    //Text Download Validation
    const downloadPromise2 = page.waitForEvent('download');
    await textDonwloadBtn.click();
    const downloadText = await downloadPromise2;
    await expect(downloadText.suggestedFilename()).toBe('sample.txt');
    const path2 = await downloadText.path();
    await expect(path2).not.toBeNull();
    await downloadText.saveAs('downloads/sample.txt');
})