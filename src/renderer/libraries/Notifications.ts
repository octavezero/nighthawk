import { EventEmitter } from 'events';
import delay from 'lodash/delay';

class Notifications extends EventEmitter {
    private notifications: Map<string, string>;

    constructor() {
        super();
        this.notifications = new Map();
    }

    addNotification = (id: string, message: string, timed: boolean = false) => {
        this.notifications.set(id, message);
        this.emit('ADD_NOTIF', notifications);
        if (timed) {
            delay(this.removeNotification, 6000, id);
        }
    };

    removeNotification = (id: string) => {
        this.notifications.delete(id);
        this.emit('DEL_NOTIF', notifications);
    };
}

const notifications = new Notifications();
export default notifications;
