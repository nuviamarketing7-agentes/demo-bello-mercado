const https = require('https');

https.get('https://demo-bello-mercado.nuviamarketing.cloud', (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (d) => {
    // ignore
  });
}).on('error', (e) => {
  console.error(e);
});
