# Plan: Fix 502 Bad Gateway

1. Check configuration of Node.js app (`server.js`, `package.json`, `Dockerfile`).
2. Identify why the app fails to start or serve traffic correctly (found multiple port binds in `server.js`).
3. Modify `server.js` to correctly use `process.env.PORT` which is expected by Nixpacks/EasyPanel.
4. Commit and push the changes to trigger a new EasyPanel deployment.
5. Poll the deployed application at `https://demo-bello-mercado.nuviamarketing.cloud` to verify it returns HTTP 200.
6. Report victory when tests pass.
