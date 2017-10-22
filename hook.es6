const webPush = require('web-push');
const Webtask = require('webtask-tools');
const app = new (require('express'))();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

webPush.setVapidDetails(
    'mailto:ridermansb@gmail.com',
    process.env.VAPID_PUBLIC,
    process.env.VAPID_PRIVATE
);

app.post('/hook', (req, res) => {
    const { storage } = req.webtaskContext;

    storage.get((error, data) => {
        if (error) { return res.send(400); }
        if (!data) {
            data = { subscriptions: [] }
        }

        const payload = JSON.stringify({
            title: 'Hook trigger',
            body: 'New hook trigger',
        });
        const sendPushPromises = data.subscriptions
            .map(keys => webPush.sendNotification(keys, payload, { TTL: 3600 }));
        Promise.all(sendPushPromises)
            .then(resp => res.json(resp))
            .catch(e => res.send(400));
    });
});

app.post('/subscribe', (req, res) => {
    const { storage } = req.webtaskContext;
    const { endpoint, keys } = req.body;

    storage.get((errorGet, data) => {
        if (errorGet) { return res.send(400); }
        if (!data) {
            data = { subscriptions: [] }
        }

        data.subscriptions.push({
            endpoint,
            keys: { p256dh: keys.p256dh, auth: keys.auth },
        });
        storage.set(data, function() {
            return res.status(200).json({ ok: true })
        });
    })
});

module.exports = Webtask.fromExpress(app);