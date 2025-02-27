// 3. Component to handle notification setup (src/components/NotificationSetup.jsx)
import  { useEffect, useState } from 'react';
import { NotificationService } from '../services/NotificationService';

export default function NotificationSetup() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        initializeNotifications();
    }, []);

    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const reg = await navigator.serviceWorker.ready;
                const sub = await reg.pushManager.getSubscription();
                console.log('Current subscription:', sub);
                if (sub) {
                    console.log('Endpoint:', sub.endpoint);
                    console.log('Auth:', sub.getKey('auth'));
                    console.log('P256DH:', sub.getKey('p256dh'));
                }
            } catch (error) {
                console.error('Error checking subscription:', error);
            }
        };
        const handleResubscribe = async () => {
            try {
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.getSubscription();
                if (subscription) {
                    await subscription.unsubscribe();
                    console.log('Unsubscribed successfully');
                }
                // Now try to resubscribe
                await NotificationService.subscribeToPushNotifications(registration);
            } catch (error) {
                console.error('Resubscribe error:', error);
            }
        };

        handleResubscribe();
        checkSubscription();
    }, []);



    const initializeNotifications = async () => {
        try {
            await NotificationService.requestPermission();
            const registration = await NotificationService.registerServiceWorker();
            await NotificationService.subscribeToPushNotifications(registration);
            setIsSubscribed(true);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            {isSubscribed ? (
                <p>You are subscribed to push notifications!</p>
            ) : (
                <div>
                    <p>Enable push notifications to stay updated</p>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}
        </div>
    );
};
