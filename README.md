**This help you in some way?** [Buy me a cofffe][coffee]  :)   
https://buymeacoff.ee/ridermansb

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Ridermansb/push-notification-when-webhook)

# Push notification with Netlify
> Sample demonstration using Netlify to handle push notification

[![Netlify Status](https://api.netlify.com/api/v1/badges/1ddd7141-4e8a-48a2-afc3-6e12fdca6f5f/deploy-status)](https://app.netlify.com/sites/push-notification-when-webhook/deploys)

## Get starter

1. Generate valid VAPID keys using [web-push][1] `web-push generate-vapid-keys`
2. Create your WebTask.io `wt create hook.js --name myhook -d web-push -d babel-runtime -d babel-core`
3. Create `.env` file from `.env.example`
4. Update `_redirects` file with new URL
5. Execute `npm run build`

[1]: https://www.npmjs.com/package/web-push
[coffee]: https://buymeacoff.ee/ridermansb
