"use client"

import {httpClient} from "@/services/api/apiClient";

const testServerNotification = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        console.log('Permission not granted for notifications');
        return
    }

    if (!('serviceWorker' in navigator)) {
        console.log('Service worker not supported');
        return
    }

    console.log('Sending notification from server');
    await httpClient.post('/api/public/push/notify', {
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