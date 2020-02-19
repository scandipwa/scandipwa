/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
import { PureComponent } from 'react';

export default function withOnline(WrappedComponent) {
    return class extends PureComponent {
        constructor(props) {
            super(props);

            this.state = {
                online: true
            };
        }

        componentDidMount() {
            window.addEventListener('online', this.handleNetworkChange);
            window.addEventListener('offline', this.handleNetworkChange);
        }

        componentWillUnmount() {
            window.removeEventListener('online', this.handleNetworkChange);
            window.removeEventListener('offline', this.handleNetworkChange);
        }

        handleNetworkChange = () => {
            if (navigator.onLine) {
                this.setState({ online: true });
            } else {
                this.setState({ online: false });
            }
        };

        render() {
            const { online } = this.state;

            return (
                <WrappedComponent
                  { ...this.props }
                  online={ online }
                />
            );
        }
    };
}
