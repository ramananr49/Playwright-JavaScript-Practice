import { expect, test } from "@playwright/test";

test("Handling Radio button related scenario in PW_JS", async ({page}) => {
    await page.goto("https://letcode.in/");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Radio"]')).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Radio"]/parent::header/following-sibling::div//p');
    await expect(alert_content).toContainText(" Interact with different types of radio & check boxes ");
    await page.locator('a[href="/radio"]').click();
    //Select any one Radio Button
    const selectAnyOne_Yes = await page.locator('input[id="yes"]');
    const selectAnyOne_no = await page.locator('input[id="no"]');
    await selectAnyOne_Yes.check();
    await expect(selectAnyOne_Yes).toBeChecked();
    await expect(selectAnyOne_no).not.toBeChecked();

    //Cofirm you can select only one radio button
    const confirmSelectOne_Yes = await page.locator('input[id="one"]');
    const confirmSelectOne_No = await page.locator('input[id="two"]');
    await confirmSelectOne_No.click();
    await expect(confirmSelectOne_No).toBeChecked();
    await expect(confirmSelectOne_Yes).not.toBeChecked();
    await confirmSelectOne_Yes.click();
    await expect(confirmSelectOne_Yes).toBeChecked();
    await expect(confirmSelectOne_No).not.toBeChecked();

    //Find the Bug Radio Button
    const findBug_Yes = page.locator('input[id="nobug"]');
    const findBug_No = page.locator('input[id="bug"]');

    await findBug_Yes.check();
    await expect(findBug_No).not.toBeChecked();
    await expect(findBug_Yes).toBeChecked();
    await findBug_No.check();
    await expect(findBug_No).toBeChecked();
    await expect.soft(findBug_Yes).not.toBeChecked();

    //Find which one is selected
    const findWhichOneSelected_foo = await page.locator('input[id="foo"]');
    const findWhichOneSelected_bar = await page.locator('input[id="notfoo"]');
    
    const status_foo = await findWhichOneSelected_foo.isChecked();
    const status_bar = await findWhichOneSelected_bar.isChecked();

    if (status_foo) {
        console.log(`Foo Radio button is Selected and its Value is : ${status_foo}`)
    }
    if (status_bar) {
        console.log(`Bar Radio button is Selected and its Value is : ${status_bar}`)
    }

    await expect(page.locator('input[name="plan"]').last()).toBeDisabled();

    await expect(page.getByLabel('Remember me')).toBeChecked();
    // await expect(page.locator('input[type="checkbox"]', {hasText: ' Remember me '})).toBeChecked();
    await page.getByLabel('I agree to the').click();
    // await page.locator('input[type="checkbox"]', {hasText: ' I agree to the '}).click();
    await expect(page.getByLabel('I agree to the')).toBeChecked();
    // await expect(page.locator('input[type="checkbox"]', {hasText: ' I agree to the '})).toBeChecked();
    await page.waitForTimeout(5000);


})