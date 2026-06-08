const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://bdfx4m.easypanel.host:3000');
  await page.fill('input[type="email"]', 'nuviamarketing7@gmail.com');
  await page.fill('input[type="password"]', '2328061410LeAMM@');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  console.log("Going to logs tab...");
  await page.goto('http://bdfx4m.easypanel.host:3000/projects/demo-bello-mercado/app/bello-mercado/logs');
  await page.waitForTimeout(5000);
  
  const text = await page.evaluate(() => document.body.innerText);
  console.log("Logs page content:");
  console.log(text.substring(text.length - 2000));
  
  await browser.close();
})();
