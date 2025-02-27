import {api} from "./services/axiosClient.ts";

const testDirectNotification = async () => {
    try {
        const permission = await Notification.requestPermission();
        console.log('Permission:', permission);

        if (permission === 'granted') {
            // Try using service worker for notification
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.ready;
                await registration.showNotification('Test Notification', {
                    body: 'Testing notification through service worker',
                    requireInteraction: true,
                    silent: false,
                    vibrate: [200, 100, 200],
                    tag: 'test-notification',
                    renotify: true
                });
                console.log('Notification sent through service worker');
            } else {
                // Fallback to direct notification
                const notification = new Notification('Direct Test', {
                    body: 'This is a direct test notification'
                });
                console.log('Direct notification created');
            }
        }
    } catch (error) {
        console.error('Notification error:', error);
    }
};


const testServerNotification = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        console.log('Permission not granted for notifications');
        return
    }

    // Try using service worker for notification

    if (!('serviceWorker' in navigator)) {
        console.log('Service worker not supported');
        return
    }

    console.log('Sending notification from server');
    await api.post('/push/notify', {
        message: 'Test notification from server'
    })
};


export const NotificationTest = () => {


    const checkNotificationStatus = () => {
        console.log('Notification permission:', Notification.permission);
        console.log('Notifications supported:', 'Notification' in window);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl mb-4">Notification Tests</h2>
            <div className={"flex space-4"}>
                <button
                    onClick={testDirectNotification}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Test Direct Notification
                </button>
                <button
                    onClick={testServerNotification}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Test Server notifications
                </button>
                <button
                    onClick={checkNotificationStatus}
                    className="px-4 py-2 bg-green-500 text-white rounded ml-2"
                >
                    Check Notification Status
                </button>
            </div>
        </div>
    );
};