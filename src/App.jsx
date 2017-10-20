import React, {PureComponent} from 'react';
import { subscribe } from './api'

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    console.log(base64);
    const rawData = window.atob(base64);
    console.log(rawData);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const WEBHOOK_URL = process.env.WEBHOOK_URL;
const VAPID_PUBLIC = process.env.VAPID_PUBLIC;

export default class extends PureComponent {
    componentWillMount() {
        this.setState({hasNotificationPermission: Notification.permission === 'granted'})
    }

    async askPermission(e) {
        e.preventDefault();
        const status = await Notification.requestPermission();
        this.setState({hasNotificationPermission: status === 'granted'});
        if (status === 'granted') { this.saveSubscription() }
    }

    async saveSubscription() {
        const reg = await navigator.serviceWorker.ready;
        debugger;
        //.then(reg => reg.pushManager.getSubscription())
        const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC),
        });

        debugger;
        subscribe(sub);
    }

    render() {
        const {hasNotificationPermission} = this.state;

        const displayingHook = hasNotificationPermission
            ? <span className="content">
                Copy your webhook bellow and paste whathever you want
                <div className="ui fluid input">
                    <input type="text" readOnly="" placeholder="WebHook" value={WEBHOOK_URL}/>
                </div>
            </span>
            : <span className="content">
                <i className="circular hand pointer icon" />
                Enable push notification on your browser
                <button className="ui primary fluid button" onClick={this.askPermission.bind(this)}>
                    Enable notifications
                </button>
            </span>;

        return <div className="ui container">
            <h2 className="ui center aligned icon header">
                {displayingHook}
            </h2>
        </div>
    }
}