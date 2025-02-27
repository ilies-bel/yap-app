
self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
});

// Handle background push events
self.addEventListener('push', function(event) {
    console.log('Push event received', event.data?.text());

    const options = {
        body: event.data.text(),
        icon: 'img.png',
        badge: 'img.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        },
        actions: [
            {action: 'explore', title: 'View Details'},
            {action: 'close', title: 'Close'}
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    if (event.action === 'explore') {
        self.clients.openWindow('/details');
    }
});


