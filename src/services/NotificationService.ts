// 2. Create a notification service (src/services/NotificationService.js)
export class NotificationService {
    static async requestPermission() {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            throw new Error('Permission not granted for notifications');
        }
        return permission;
    }

    static async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                return await navigator.serviceWorker.register('/service-worker.js');
            } catch (error) {
                throw new Error('ServiceWorker registration failed: ' + error);
            }
        }
        throw new Error('ServiceWorker not supported');
    }

    static async subscribeToPushNotifications(registration: ServiceWorkerRegistration) {
        try {
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array("BImXtAWdYXPKpCYFYiISx7reiHQ1xo_yQpee20wsKroHQNKYU7q_6geAWdAXzckPL3DNeVDH1JaRwNPaXf9o808")
            });

            // Send subscription to your server
            await fetch('http://localhost:8080/api/push/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscription)
            });

            return subscription;
        } catch (error) {
            throw new Error('Failed to subscribe to push notifications: ' + error);
        }
    }
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}