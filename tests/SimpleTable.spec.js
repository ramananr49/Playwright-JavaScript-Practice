import { expect, test } from "@playwright/test";
import { reverse } from "node:dns";

test("Handling Simple web Table related scenario in PW_JS", async ({page}, testInfo) => {
    await page.goto("https://letcode.in");
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//*[contains(@class, "card-header-title") and normalize-space()="Table"]').first()).toBeVisible();
    const alert_content = await page.locator('//*[normalize-space()="Table"]/parent::header/following-sibling::div//p').first();
    await expect(alert_content).toContainText(" It's all about rows & columns ");
    await page.locator('a[href="/table"]').scrollIntoViewIfNeeded();
    await page.locator('a[href="/table"]').click();
    await page.waitForTimeout(2000);
    await expect(page.locator('h1[class^="title"]')).toBeVisible();
    const ss = await page.screenshot();
    testInfo.attach("Landing Screenshot", {
        body: ss,
        contentType: 'image/png',
    });

    const shoppingListPrices = await page.locator('//table[@id="shopping"]//tr/td[2]');
    const totalPrice = await page.locator('//table[@id="shopping"]//td/b');

    const count = await shoppingListPrices.count();
    let actTotal = 0;
    for (let i =0 ; i<count; i++) {
        let actPrice = await shoppingListPrices.nth(i).textContent();
        console.log(await shoppingListPrices.nth(i).textContent());
        actTotal += parseInt(actPrice);
    }
    await expect(actTotal).toEqual(parseInt(await totalPrice.textContent()));

    //Mark Raj as Present
    const firstNames = await page.locator('//table[@id="simpletable"]//tr/td[1]');
    const lastNames = await page.locator('//table[@id="simpletable"]//tr/td[2]');

    const fno = await firstNames.count();
    const lno = await lastNames.count();
    const markName = "Raj";
    const row_raj = 0;

    for(let i=0; i<fno; i++) {
        if (markName === await firstNames.nth(i).textContent()) {
            await firstNames.nth(i).locator('xpath=following-sibling::td/input').check();
        }
        else if(markName === await lastNames.nth(i).textContent()) {
            await lastNames.nth(i).locator('xpath=following-sibling::td/input').check();
        }
    }
    const ss1 = await page.screenshot();
    testInfo.attach("Mark Present Screenshot", {
        body: ss1,
        contentType: 'image/png',
    });

    //Checking sorting is working in Sorting table

    const Dessert_header = await page.locator('th[mat-sort-header="name"]');
    const Calories_header = await page.locator('th[mat-sort-header="calories"]');
    const fat_header = await page.locator('th[mat-sort-header="fat"]');
    const carbs_header = await page.locator('th[mat-sort-header="carbs"]');
    const protein_header = await page.locator('th[mat-sort-header="protein"]');
    const cholestral_header = await page.locator('th[mat-sort-header="Cholesterol"]');

    let initial_names = [];
    const names_element = await page.locator('//table[contains(@class, "mat-sort")]/tr/td[1]');
    for (let a=0; a<await names_element.count(); a++) {
        initial_names.push(await names_element.nth(a).textContent());
    }
    await Dessert_header.click();
    await page.waitForTimeout(2000);
    let final_names = [];
    for (let b=0; b<await names_element.count(); b++) {
        final_names.push(await names_element.nth(b).textContent());
    }
    // console.log(final_names)
    initial_names.sort();
    // console.log(initial_names);
    await expect(initial_names).toEqual(final_names);

    await Dessert_header.click();
    await page.waitForTimeout(2000);
    let des_names = [];
    for (let c=0; c<await names_element.count(); c++) {
        des_names.push(await names_element.nth(c).textContent());
    }
    // console.log(des_names);

    initial_names.sort().reverse();
    // console.log(initial_names);
    await expect(initial_names).toEqual(des_names);


    //Validate the Cholesterol Column sorting funtionality
    let initial_cholesterol = [];
    const cholestrol_element = await page.locator('//table[contains(@class, "mat-sort")]/tr/td[6]');
    for (let e=0; e<await cholestrol_element.count(); e++) {
        // console.log(await cholestrol_element.nth(e).textContent());
        initial_cholesterol.push(parseInt(await cholestrol_element.nth(e).textContent()));
    }
    console.log(`Initial Cholesterol column order ${initial_cholesterol}`);
    console.log(initial_cholesterol)

    await cholestral_header.click();
    await page.waitForTimeout(2000);

    let ascending_cholestrol = [];
    for (let f=0; f<await cholestrol_element.count(); f++) {
        ascending_cholestrol.push(parseInt(await cholestrol_element.nth(f).textContent()));
    }
    console.log(`Ascending Cholesterol column order ${ascending_cholestrol}`);
    console.log(ascending_cholestrol);
    initial_cholesterol.sort((a,b)=> a-b);
    await expect(initial_cholesterol).toEqual(ascending_cholestrol);

    await cholestral_header.click();
    await page.waitForTimeout(2000);

    let descending_cholestrol = [];
    for (let g=0; g<await cholestrol_element.count(); g++) {
        descending_cholestrol.push(parseInt(await cholestrol_element.nth(g).textContent()));
    }
    console.log(`descending Cholesterol column order ${descending_cholestrol}`);
    console.log(descending_cholestrol);
    initial_cholesterol.sort((a,b) => b-a);
    await expect(initial_cholesterol).toEqual(descending_cholestrol);
})