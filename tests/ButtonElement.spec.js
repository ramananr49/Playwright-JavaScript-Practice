import { expect, test } from "@playwright/test";

test("Handling Button element related scenario in PW_JS", async ({page}) => {
    await page.goto("https://letcode.in/");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator(".card-header-title", {hasText: "Button"})).toBeVisible();
    const button_content = await page.locator('//*[normalize-space()="Button"]/parent::header/following-sibling::div//p');
    await expect(button_content).toContainText(" Interact with different types of buttons ");
    await page.getByRole("button", {hasText: "Click"}).click();
    //gotoHome button
    await page.getByRole("button", {hasText: "Goto Home"}).click();
    await expect(page).toHaveURL("https://letcode.in/test");
    await expect(page.getByRole("button", {hasText: "Click"})).toBeVisible();
    await page.locator('//a[@href="/button"]').click();
    await expect(page.locator('#home')).toBeVisible();
    const Location_btn = await page.locator('#position').boundingBox();
    console.log(`x-Location : ${Location_btn.x}, y-Location : ${Location_btn.y}`);
    const colorBtn = await page.locator('//*[@id="color"]');
    await expect(colorBtn).toHaveCSS("background-color", 'rgb(42, 157, 144)');
    const tall_fat_btn = await page.locator('#property').boundingBox();
    console.log(`Height : ${tall_fat_btn.height} & Width : ${tall_fat_btn.width}`);
    await expect(page.locator('button[title="Disabled button"]')).toBeVisible();
    await expect(page.locator('button[title="Disabled button"]')).toHaveAttribute("disabled", "");
    const beforeHold = await page.locator('button[id="isDisabled"][class*="is-primary"]').textContent();
    await page.locator('button[id="isDisabled"][class*="is-primary"]').hover();
    await page.mouse.down();
    await page.waitForTimeout(2000);
    await page.mouse.up();
    const AfterHold = await page.locator('button[id="isDisabled"][class*="is-primary"]').textContent();
    await expect(beforeHold).not.toBe(AfterHold);
})