import Cookies from "js-cookie";
import {v4 as uuidv4} from 'uuid';

const DEVICE_COOKIE_KEY = 'device';

export const deviceService = {

    generateDeviceId() {
        const deviceId = Cookies.get(DEVICE_COOKIE_KEY);

        if (deviceId) {
            return;
        }
        
        Cookies.set(DEVICE_COOKIE_KEY, uuidv4());
    },


    getDeviceId() {
        return Cookies.get(DEVICE_COOKIE_KEY);
    }
}