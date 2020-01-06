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
import { connect } from 'react-redux';
import { updateSingleConfigProperty } from 'Store/Config';
import { CUSTOMER } from 'Store/MyAccount/MyAccount.dispatcher';
import BrowserDatabase from 'Util/BrowserDatabase';
import WelcomeMessage from './WelcomeMessage.component';

export const mapStateToProps = state => ({
    welcome: state.ConfigReducer.welcome,
    isLoading: state.ConfigReducer.isLoading,
    isSignedIn: state.MyAccountReducer.isSignedIn,
    showWelcomeMessage: state.ConfigReducer.showWelcomeMessage
});

export const mapDispatchToProps = dispatch => ({
    updateConfig: data => dispatch(updateSingleConfigProperty(data))
});

export class WelcomeMessageContainer extends PureComponent {
    static propTypes = {
        welcome: PropTypes.string,
        isSignedIn: PropTypes.bool.isRequired,
        showWelcomeMessage: PropTypes.bool
    };

    static defaultProps = {
        welcome: '',
        showWelcomeMessage: false
    };

    containerProps = () => ({
        welcomeMessage: this._getWelcomeMessage()
    });

    _getUsername() {
        const { isSignedIn } = this.props;
        if (!isSignedIn) return '';

        const { firstname = '', lastname = '' } = BrowserDatabase.getItem(CUSTOMER) || {};
        const fullname = `${firstname} ${lastname}`;
        return fullname.length === 1
            ? ''
            : fullname;
    }

    _getWelcomeMessage() {
        const { welcome } = this.props;
        const username = this._getUsername();

        if (!username.length) return welcome;

        return `${username}, ${welcome}`;
    }

    render() {
        return (
            <WelcomeMessage
              { ...this.props }
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeMessageContainer);
