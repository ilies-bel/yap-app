import {useEffect, useState} from 'react';
import {NotificationService} from '../services/NotificationService';

export default function NotificationSetup() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const setupNotifications = async () => {
            try {
                // Request permission
                await NotificationService.requestPermission();

                // Register service worker
                const registration = await NotificationService.registerServiceWorker();

                // Check for existing subscription
                const existingSubscription = await registration.pushManager.getSubscription();

                // Log subscription info for debugging
                if (existingSubscription) {
                    console.log('Existing subscription found:', existingSubscription.endpoint);

                    // Optionally unsubscribe to avoid duplicates
                    await existingSubscription.unsubscribe();
                    console.log('Unsubscribed from existing subscription');
                }

                // Create a new subscription
                const subscription = await NotificationService.subscribeToPushNotifications(registration);
                console.log('Subscribed successfully:', subscription.endpoint);

                setIsSubscribed(true);
            } catch (err) {
                console.error('Notification setup error:', err);
                setError(err.message);
            }
        };

        setupNotifications();
    }, []); // Empty dependency array = run once on mount

    return (
        <div>
            {isSubscribed ? (
                <p>You are subscribed to push notifications!</p>
            ) : (
                <div>
                    <p>Enable push notifications to stay updated</p>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </div>
            )}
        </div>
    );
}