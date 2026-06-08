const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://bdfx4m.easypanel.host:3000');
  await page.fill('input[type="email"]', 'nuviamarketing7@gmail.com');
  await page.fill('input[type="password"]', '2328061410LeAMM@');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  await page.goto('http://bdfx4m.easypanel.host:3000/projects/demo-bello-mercado/app/bello-mercado/deployments');
  await page.waitForTimeout(4000);
  
  const viewButton = await page.$('button:has-text("View")');
  if (viewButton) {
    await viewButton.click();
    await page.waitForTimeout(4000);
    const logs = await page.evaluate(() => document.body.innerText);
    console.log(logs.substring(0, 1000));
    console.log("----");
    console.log(logs.substring(logs.length - 2000));
  }
  
  await browser.close();
})();
