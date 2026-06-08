const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log("Navigating to EasyPanel...");
  await page.goto('http://bdfx4m.easypanel.host:3000');
  
  console.log("Logging in...");
  await page.fill('input[type="email"]', 'nuviamarketing7@gmail.com');
  await page.fill('input[type="password"]', '2328061410LeAMM@');
  await page.click('button[type="submit"]');
  
  await page.waitForTimeout(3000);
  page.on('response', async response => {
    if (response.url().includes('trpc/') && response.request().method() === 'GET') {
      try {
        const json = await response.json();
        console.log(`[TRPC Response] ${response.url()}:\\n`, JSON.stringify(json, null, 2).substring(0, 2000));
      } catch (e) {}
    }
  });

  // Go to service page directly
  await page.goto('http://bdfx4m.easypanel.host:3000/projects/demo-bello-mercado/app/bello-mercado/advanced');
  await page.waitForTimeout(5000);
  
  await browser.close();
})();
