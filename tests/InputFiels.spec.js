import {test, expect} from '@playwright/test'

test("Handling Input Field related scenario in PW_JS", async ({page}) => {
    await page.goto("https://letcode.in/");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('.card-header p', {hasText: 'Input'})).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Input"]/parent::header/following-sibling::div//p').textContent();
    expect(input_content).toContain("Interact with different types of input fields");
    await page.locator('a[href="/edit"]').click();
    await expect(page.locator('h1[class*="title"]')).toHaveText("Input", {timeout: 10000});
    await page.locator("#fullName").fill("Ramanan Ramasamy");
    await page.locator("#join").click();
    await page.locator("#join").type(" Tester");
    await expect(page.locator("#join")).toHaveValue("I am good Tester");
    await page.keyboard.press('Tab');
    const exp_getText = await page.locator("#getMe").inputValue();
    expect(exp_getText).toEqual("ortonikc");
    const olf_text = await page.locator("#clearMe").inputValue();
    await page.locator("#clearMe").clear();
    await page.locator("#clearMe").fill("Ramanan Ramasamy");
    expect(olf_text).toEqual("Koushik Chatterjee");
    await expect(page.locator("#clearMe")).toHaveValue("Ramanan Ramasamy");
    await expect(page.locator("#noEdit")).toBeDisabled();
    await expect(page.locator("#dontwrite")).toHaveAttribute("readonly");
    await page.close();

})