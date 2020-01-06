/* eslint-disable max-len */

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
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './WelcomeMessage.style';

class WelcomeMessage extends PureComponent {
    static propTypes = {
        welcomeMessage: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired,
        updateConfig: PropTypes.func.isRequired,
        showWelcomeMessage: PropTypes.bool.isRequired
    };

    handleClick = () => {
        const { updateConfig } = this.props;
        document.documentElement.style.setProperty('--welcome-message-height', '0px');
        updateConfig({ showWelcomeMessage: false });
    };

    render() {
        const { isLoading, welcomeMessage, showWelcomeMessage } = this.props;
        // console.log(isLoading, showWelcomeMessage);

        if (isLoading) return null;

        if (!isLoading && !showWelcomeMessage) return <div block="WelcomeMessage" />;

        document.documentElement.style.setProperty('--welcome-message-height', '30px');

        return (
            <div block="WelcomeMessage">
                { __(welcomeMessage) }
                <button
                  onClick={ this.handleClick }
                  block="WelcomeMessage"
                  elem="CloseButton"
                >
                    Close
                </button>
            </div>
        );
    }
}

export default WelcomeMessage;
