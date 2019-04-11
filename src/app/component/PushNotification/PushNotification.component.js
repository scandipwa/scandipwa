import React, { Component } from 'react';
import PropTypes from 'prop-types';

const GRANTED = 'granted';
const DENIED = 'denied';
const DEFAULT = 'default';

class PushNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            supported: 'Notification' in window && window.Notification,
            granted: false
        };
    }

    componentDidMount() {
        const {
            handleNotSupported,
            handleDenied,
            handleGranted,
            forceAsk
        } = this.props;
        const { supported } = this.state;


        if (supported === false) {
            handleNotSupported();
            return;
        }


        switch (Notification.permission) {
        case GRANTED:
            this.setState({ granted: true }, () => {
                handleGranted();
            });
            break;
        case DENIED:
            this.setState({ granted: false }, () => {
                handleDenied();
            });
            break;
        case DEFAULT:
            if (forceAsk) this.askPermission();
            break;
        default:
            break;
        }
    }

    showNotification() {
        const {
            title,
            options,
            serviceWorkerRegistration
        } = this.props;
        // use deafult service worker if not provided in props

        serviceWorkerRegistration.then((registration) => {
            registration.showNotification(title, options);
        });
    }

    askPermission() {
        window.Notification.requestPermission().then((res) => {
            const granted = res === GRANTED;
            const { handleGranted, handleDenied } = this.props;

            this.setState({ granted }, () => {
                if (granted) {
                    handleGranted();
                } else {
                    handleDenied();
                }
            });
        });
    }

    render() {
        const { title } = this.props;
        const { granted, supported } = this.state;

        if (granted && supported && title) {
            this.showNotification();
        }

        return (
            <div style={ { display: 'none' } } />
        );
    }
}

PushNotification.propTypes = {
    handleGranted: PropTypes.func,
    handleDenied: PropTypes.func,
    handleNotSupported: PropTypes.func,
    serviceWorkerRegistration: PropTypes.shape({
        // Promise
        then: PropTypes.func,
        catch: PropTypes.func
    }),
    forceAsk: PropTypes.bool,
    title: PropTypes.string.isRequired,
    options: PropTypes.shape({
        actions: PropTypes.arrayOf(PropTypes.object),
        badge: PropTypes.string,
        body: PropTypes.string,
        dir: PropTypes.string,
        icon: PropTypes.string,
        image: PropTypes.string,
        lang: PropTypes.string,
        renotify: PropTypes.bool,
        requireInteraction: PropTypes.bool,
        tag: PropTypes.string,
        vibrate: PropTypes.arrayOf(PropTypes.number),
        data: PropTypes.any
    })
};

PushNotification.defaultProps = {
    serviceWorkerRegistration: navigator.serviceWorker.getRegistration(),
    handleGranted: () => {},
    handleDenied: () => {},
    handleNotSupported: () => {},
    forceAsk: false,
    options: {}
};

export default PushNotification;
