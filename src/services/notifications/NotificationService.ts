// 2. Create a notification service (src/services/NotificationService.js)

import {urlBase64ToUint8Array} from "@/services/notifications/UrlBase64ToUint8Array";
import {axiosClient} from "@/services/api/apiClient";


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
            await axiosClient.post('/api/public/push/subscribe', subscription);

            return subscription;
        } catch (error) {
            throw new Error('Failed to subscribe to push notifications: ' + error);
        }
    }
}

