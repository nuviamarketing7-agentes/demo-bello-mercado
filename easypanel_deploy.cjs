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
  console.log("Going to service page...");
  // Go to source tab
  await page.goto('http://bdfx4m.easypanel.host:3000/projects/demo-bello-mercado/app/bello-mercado/source');
  await page.waitForTimeout(3000);

  // Click Save to update the commit (often clicking Save on Source pulls the latest from Git)
  const buttons = await page.evaluate(() => Array.from(document.querySelectorAll('button')).map(b => b.innerText));
  console.log("Buttons on source tab:", buttons);

  let saveButton = await page.$('button:has-text("Save")');
  if (saveButton) {
    console.log("Clicking Save on Source tab...");
    await saveButton.click();
    await page.waitForTimeout(3000);
  }

  // Go to deployments tab
  await page.goto('http://bdfx4m.easypanel.host:3000/projects/demo-bello-mercado/app/bello-mercado/deployments');
  await page.waitForTimeout(3000);
  
  const deployButton = await page.$('button:has-text("Deploy")');
  if (deployButton) {
    console.log("Clicking deploy...");
    await deployButton.click();
    await page.waitForTimeout(2000);
    console.log("Deploy triggered.");
  }

  // Wait for deployment to finish by checking TRPC logs or polling DOM
  for(let i=0; i<30; i++) {
    await page.waitForTimeout(2000);
    const html = await page.content();
    if (html.includes('Deploying')) {
       console.log("Still Deploying...");
    } else {
       console.log("Deployment might be finished.");
       break;
    }
  }
  
  await browser.close();
})();
