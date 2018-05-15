import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Notifications from '../libraries/Notifications';

interface NotificationContainerProps {}

interface NotificationContainerState {
    notifications: Map<string, string>;
}

export default class NotificationContainer extends React.Component<
    NotificationContainerProps,
    NotificationContainerState
> {
    constructor(props: any) {
        super(props);
        this.state = {
            notifications: new Map(),
        };
    }

    addNotification = (args: { notifications: Map<string, string> }) => {
        this.setState({ notifications: new Map(args.notifications) });
    };

    removeNotification = (args: { notifications: Map<string, string> }) => {
        this.setState({ notifications: new Map(args.notifications) });
    };

    componentDidMount() {
        Notifications.addListener('ADD_NOTIF', this.addNotification);
        Notifications.addListener('DEL_NOTIF', this.removeNotification);
    }

    componentWillUnmount() {
        Notifications.removeListener('ADD_NOTIF', this.addNotification);
        Notifications.removeListener('DEL_NOTIF', this.removeNotification);
    }

    shouldComponentUpdate(
        nextProps: NotificationContainerProps,
        nextState: NotificationContainerState
    ) {
        if (this.state.notifications.size === nextState.notifications.size) {
            return false;
        }
        return true;
    }

    render() {
        let values: any[] = [];
        this.state.notifications.forEach((value: string, key: string) =>
            values.push(
                <CSSTransition key={key} timeout={500} classNames="animate">
                    <div className="notifications-box">
                        <h5>{value}</h5>
                    </div>
                </CSSTransition>
            )
        );
        return (
            <TransitionGroup className="notifications">
                {values}
            </TransitionGroup>
        );
    }
}
