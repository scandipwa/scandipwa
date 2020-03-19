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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MyAccountDispatcher } from 'Store/MyAccount';
import MyAccountTabList from './MyAccountTabList.component';

export const mapDispatchToProps = dispatch => ({
    logout: () => MyAccountDispatcher.logout(null, dispatch)
});

export class MyAccountTabListContainer extends PureComponent {
    static propTypes = {
        onSignOut: PropTypes.func,
        logout: PropTypes.func.isRequired
    };

    static defaultProps = {
        onSignOut: () => {}
    };

    containerFunctions = {
        handleLogout: this.handleLogout.bind(this)
    };

    handleLogout() {
        const { onSignOut, logout } = this.props;

        logout();
        onSignOut();
    }

    render() {
        return (
            <MyAccountTabList
              { ...this.props }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(MyAccountTabListContainer);
