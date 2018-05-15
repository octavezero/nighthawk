import { EventEmitter } from 'events';

class Notifications extends EventEmitter {
    private notifications: Map<string, string>;

    constructor() {
        super();
        this.notifications = new Map();
    }

    addNotification = (id: string, message: string) => {
        this.notifications.set(id, message);
        this.emit('ADD_NOTIF', notifications);
    };

    removeNotification = (id: string) => {
        this.notifications.delete(id);
        this.emit('DEL_NOTIF', notifications);
    };
}

const notifications = new Notifications();
export default notifications;
