import {useState} from "react";

export const FuturisticDrone = () => {
    const [rotating, setRotating] = useState(false);

    return (
        <div className="flex flex-col items-center">
            <div className="mt-4 flex items-center">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={() => setRotating(!rotating)}
                >
                    {rotating ? 'Pause Rotation' : 'Enable Rotation'}
                </button>
            </div>
        </div>
    );
};
export default FuturisticDrone;