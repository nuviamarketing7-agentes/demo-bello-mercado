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
  
  const deployments = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('tr'));
    return rows.slice(1, 4).map(r => r.innerText.replace(/\n/g, ' '));
  });
  console.log("Recent deployments:", deployments);
  
  const logsButton = await page.$('button:has-text("Logs")');
  if (logsButton) {
    await logsButton.click();
    await page.waitForTimeout(3000);
    const logsText = await page.evaluate(() => document.body.innerText);
    console.log("Logs excerpt:");
    console.log(logsText.substring(logsText.length - 2000));
  } else {
    console.log("No Logs button found.");
  }

  await browser.close();
})();
