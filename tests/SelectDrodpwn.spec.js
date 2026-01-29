import { expect, test } from "@playwright/test";

test("", async ({page}) => {
    await page.goto("https://letcode.in/");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Select"]')).toBeVisible();
    const select_content = await page.locator('//*[normalize-space()="Select"]/parent::header/following-sibling::div//p');
    await expect(select_content).toContainText(" Interact with different types of drop-down ");
    await page.locator('a[href="/dropdowns"]').click();
    await page.locator('#fruits').selectOption({label: 'Apple'});
    await expect(await page.locator('p[class="subtitle"]')).toContainText("You have selected Apple");
    await page.locator('#fruits').selectOption("4");
    await expect(await page.locator('p[class="subtitle"]')).toContainText("You have selected Pine Apple");
    await page.locator('#fruits').selectOption({index: 3});
    await expect(await page.locator('p[class="subtitle"]')).toContainText("You have selected Orange");

    //multiSelect Dropdwon
    await expect(page.locator('#superheros')).toHaveAttribute("multiple");
    await page.locator('#superheros').selectOption(["am", "ta"]);
    
    //Select the last programming language and print all the options
    const lang_options = await page.locator("#lang option").all();
    
    for (const option of lang_options) {
        const text = await option.textContent();
        const value = await option.getAttribute("value");
        console.log(`Text : ${text} & Value : ${value}`)
    }

    const lastOptionValue = await page.locator('#lang option').last().getAttribute("value");
    await page.locator('#lang').selectOption(lastOptionValue);
    await expect(page.locator('#lang')).toHaveValue("sharp");

    //Select India using value & print the selected value
    await expect(page.locator('#country')).toHaveValue('Argentina');
    await page.locator('#country').selectOption({label: 'India'});
    await expect(page.locator('#country')).toHaveValue('India');

    const options = await page.locator('#country option').all();

    for (let option of options) {
        // const text = await option.textContent();
        // const value = await option.getAttribute('value');
        // console.log(`${text}`);
        console.log(await option.textContent());
    }
})