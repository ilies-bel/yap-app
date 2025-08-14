'use client'
import {useEffect, useState} from 'react';
import {NotificationService} from '../services/notifications/NotificationService';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';

export default function NotificationSetup() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Check existing subscription status on mount
    useEffect(() => {
        const checkExistingSubscription = async () => {
            try {
                if ('serviceWorker' in navigator) {
                    const registration = await navigator.serviceWorker.getRegistration();
                    if (registration) {
                        const existingSubscription = await registration.pushManager.getSubscription();
                        setIsSubscribed(!!existingSubscription);
                    }
                }
            } catch (err) {
                console.error('Error checking subscription status:', err);
            }
        };

        checkExistingSubscription();
    }, []);

    const handleToggleNotifications = async (enabled: boolean) => {
        setIsLoading(true);
        setError(null);

        try {
            if (enabled) {
                // Subscribe to notifications
                await NotificationService.requestPermission();
                const registration = await NotificationService.registerServiceWorker();
                await NotificationService.subscribeToPushNotifications(registration);
                console.log('Successfully subscribed to notifications');
                setIsSubscribed(true);
            } else {
                // Unsubscribe from notifications
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration) {
                    const existingSubscription = await registration.pushManager.getSubscription();
                    if (existingSubscription) {
                        await existingSubscription.unsubscribe();
                        console.log('Successfully unsubscribed from notifications');
                    }
                }
                setIsSubscribed(false);
            }
        } catch (err) {
            console.error('Notification toggle error:', err);
            setError(err instanceof Error ? err.message : 'Failed to update notification settings');
            // Revert the toggle state if there was an error
            setIsSubscribed(!enabled);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Switch
                    id="notifications"
                    checked={isSubscribed}
                    onCheckedChange={handleToggleNotifications}
                    disabled={isLoading}
                />
                <Label htmlFor="notifications" className="text-sm font-medium">
                    Enable push notifications
                </Label>
            </div>
            
            <div className="text-sm text-gray-600">
                {isLoading ? (
                    <p>Updating notification settings...</p>
                ) : isSubscribed ? (
                    <p>You will receive push notifications for important updates</p>
                ) : (
                    <p>Turn on notifications to stay updated with your tasks</p>
                )}
            </div>

            {error && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                    Error: {error}
                </div>
            )}
        </div>
    );
}