> Sample demonstration using WebTask.io to handle push notification

## Get starter

1. Generate valid VAPID keys using [web-push][1] `web-push generate-vapid-keys`
2. Create `.env` file from `.env.example`
3. Execute `npm run build`
4. Create your WebTask.io `wt create hook.js --name myhook -d web-push -d babel-runtime -d babel-core`

[1]: https://www.npmjs.com/package/web-push