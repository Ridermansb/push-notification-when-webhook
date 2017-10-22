import React, {PureComponent} from 'react';
import { autobind } from 'core-decorators';
import Clipboard from 'clipboard';
import {subscribe} from './api'

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const API_URL = process.env.API_URL;
const VAPID_PUBLIC = process.env.VAPID_PUBLIC;

export default class extends PureComponent {
    componentWillMount() {
        this.setState({hasNotificationPermission: Notification.permission === 'granted'})
    }

    componentDidMount() {
        const {hasNotificationPermission} = this.state;
        if (hasNotificationPermission) {
            this.setClipboardButton();
        }
    }

    componentWillUnmount( ) {
        if (this.clipHook) {
            this.clipHook.destroy();
        }
    }

    @autobind
    setClipboardButton() {
        this.clipHook = new Clipboard(this.buttonCopyHook);
        this.clipHook.on('success', function(e) {
            e.clearSelection();
        });

        this.clipHook.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
        });
    }

    @autobind
    async askPermission(e) {
        e.preventDefault();
        const status = await Notification.requestPermission();
        const self = this;
        this.setState({hasNotificationPermission: status === 'granted'}, function() {
            self.setClipboardButton();
        });
        if (status === 'granted') {
            await this.saveSubscription()
        }
    }

    @autobind
    async saveSubscription() {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC),
        });

        subscribe(sub);
    }

    render() {
        const {hasNotificationPermission} = this.state;

        const displayText = hasNotificationPermission
            ? <span className="content">
                Copy your webhook bellow and paste whathever you want
                <pre className="sub header">curl -X POST {API_URL}/hook</pre>
            </span>
            : <span className="content">
                <i className="circular hand pointer icon"/>
                Enable push notification on your browser
            </span>;

        const displayAction = hasNotificationPermission
            ? <div className="ui fluid action input">
                <input id="hook" type="text" readOnly="" placeholder="WebHook" defaultValue={`${API_URL}/hook`} />
                <button className="ui teal right labeled icon button" data-clipboard-target="#hook"
                    ref={(el) => this.buttonCopyHook = el}>
                    <i className="copy icon"/>Copy
                </button>
            </div>
            : <button className="ui primary fluid button" onClick={this.askPermission.bind(this)}>
                Enable notifications
            </button>;

        return <div className="ui container">
            <h2 className="ui center aligned icon header">
                {displayText}
            </h2>
            {displayAction}
        </div>
    }
}