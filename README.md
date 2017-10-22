> Sample demonstration using WebTask.io to handle push notification

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Ridermansb/push-notification-when-webhook)

## Get starter

1. Generate valid VAPID keys using [web-push][1] `web-push generate-vapid-keys`
2. Create your WebTask.io `wt create hook.js --name myhook -d web-push -d babel-runtime -d babel-core`
3. Create `.env` file from `.env.example`
4. Execute `npm run build`

[1]: https://www.npmjs.com/package/web-push