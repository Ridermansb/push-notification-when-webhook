self.addEventListener('push', (event) => {
    const notificationData = event.data.json();

    event.waitUntil(
        self.registration.showNotification(notificationData.title, {
            body: notificationData.body,
            icon: notificationData.icon,
            tag: notificationData.tag,
        }),
    );
});