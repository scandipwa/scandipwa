import { Component } from 'react';
import { GRANTED, DENIED, DEFAULT } from 'Store/Notification';
import { PushNotificationType } from 'Type/NotificationList';

class PushNotification extends Component {
    constructor(props) {
        super(props);

        this.granted = props.grantType === GRANTED;
        this.windowFocus = document.visibilityState === 'visible';
    }

    componentDidMount() {
        window.addEventListener('blur', this.onWindowBlur);
        window.addEventListener('focus', this.onWindowFocus);

        const {
            forceAsk,
            supported,
            grantType
        } = this.props;

        if (supported === false) return;

        if (grantType === DEFAULT && forceAsk) {
            this.askPermission();
        }
    }

    // Handle permission updates
    componentDidUpdate(prevProps) {
        const { grantType: oldGrant } = prevProps;
        const {
            grantType: newGrant,
            handleDenied, handleGranted
        } = this.props;
        const grantChanged = oldGrant !== newGrant;

        if (grantChanged === false) return;

        if (newGrant === DENIED) handleDenied();
        if (newGrant === GRANTED) handleGranted();
    }

    componentWillUnmount() {
        window.removeEventListener('blur', this.onWindowBlur);
        window.removeEventListener('focus', this.onWindowFocus);
    }

    /**
     * Triggers when tab is focused
     * @returns {void}
     */
    onWindowFocus() {
        this.windowFocus = true;
    }

    /**
     * Triggers when tab is not focused
     * @returns {void}
     */
    onWindowBlur() {
        this.windowFocus = false;
    }

    /**
     * Push a notification using service worker
     * @returns {void}
     */
    showNotification() {
        const {
            title,
            options,
            serviceWorkerRegistration
        } = this.props;

        if (!serviceWorkerRegistration) return;

        serviceWorkerRegistration.then((registration) => {
            registration.showNotification(title, options);
        });
    }

    /**
     * Ask user to grant web notifications permissions
     * @returns {void}
     */
    askPermission() {
        window.Notification.requestPermission().then((res) => {
            const { setPermissions } = this.props;

            this.granted = res === GRANTED;
            setPermissions(res);
        });
    }

    render() {
        const {
            title,
            supported,
            onFocus,
            onBlur
        } = this.props;

        if (this.granted && supported && title) {
            const focused = this.windowFocus && onFocus;
            const blurred = !this.windowFocus && onBlur;

            if (focused || blurred) {
                this.showNotification();
            }
        }

        return null;
    }
}

PushNotification.propTypes = PushNotificationType.isRequired;

PushNotification.defaultProps = {
    serviceWorkerRegistration: navigator.serviceWorker
        ? navigator.serviceWorker.getRegistration()
        : null,
    handleGranted: () => {},
    handleDenied: () => {},
    forceAsk: true,
    options: {},
    onFocus: true,
    onBlur: true
};

export default PushNotification;
