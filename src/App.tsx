import { useState } from 'react'

import PWABadge from './PWABadge.tsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)



  return (
    <>
        <NotificationTest/>
      <h1>yet-another-planner</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <PWABadge />
    </>
  )
}

export default App



const NotificationTest = () => {
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
                    onClick={testDirectNotification}
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