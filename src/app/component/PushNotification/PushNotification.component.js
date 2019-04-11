import React, { Component } from 'react';
import PropTypes from 'prop-types';

const GRANTED = 'granted';
const DENIED = 'denied';
const DEFAULT = 'default';

class PushNotification extends Component {
    constructor(props) {
        super(props);

        this.granted = props.grantType === GRANTED;
    }

    componentDidMount() {
        const {
            forceAsk,
            supported,
            grantType
        } = this.props;

        if (supported === false) {
            return;
        }

        if (grantType === DEFAULT && forceAsk) {
            this.askPermission();
        }
    }

    componentDidUpdate(prevProps) {
        const { grantType: oldGrant } = prevProps;
        const {
            grantType: newGrant,
            handleDenied, handleGranted,
            grantType
        } = this.props;

        if (oldGrant !== newGrant && newGrant === DENIED) {
            handleDenied();
        } else if (oldGrant !== newGrant && newGrant === GRANTED) {
            handleGranted();
        }

        this.granted = grantType === GRANTED;
    }

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

    askPermission() {
        window.Notification.requestPermission().then((res) => {
            const { setPermissions } = this.props;

            setPermissions(res);
        });
    }

    render() {
        const { title, supported } = this.props;

        if (this.granted && supported && title) {
            this.showNotification();
        }

        return (
            <div style={ { display: 'none' } } />
        );
    }
}

PushNotification.propTypes = {
    supported: PropTypes.bool.isRequired,
    grantType: PropTypes.string.isRequired,
    setPermissions: PropTypes.func.isRequired,
    handleGranted: PropTypes.func,
    handleDenied: PropTypes.func,
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
    serviceWorkerRegistration: navigator.serviceWorker
        ? navigator.serviceWorker.getRegistration()
        : null,
    handleGranted: () => {},
    handleDenied: () => {},
    forceAsk: true,
    options: {}
};

export default PushNotification;
