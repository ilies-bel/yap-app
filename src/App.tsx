import {useState} from 'react'

import PWABadge from './PWABadge.tsx'
import './App.css'
import {NotificationTest} from "./NotificationTest.tsx";
import NotificationSetup from "./component/NotificationSetup.tsx";

function App() {
    const [count, setCount] = useState(0)


    return (
        <>
            <NotificationSetup/>
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
            <PWABadge/>
        </>
    )
}

export default App



