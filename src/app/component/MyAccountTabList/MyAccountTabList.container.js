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
import { connect } from 'react-redux';
import { MyAccountDispatcher } from 'Store/MyAccount';
import MyAccountTabList from './MyAccountTabList.component';

export const mapDispatchToProps = middleware(
    dispatch => ({
        logout: () => MyAccountDispatcher.logout(null, dispatch)
    }),
    'Component/MyAccountTabList/Container/mapDispatchToProps'
);

export class MyAccountTabListContainer extends ExtensiblePureComponent {
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

export default connect(null, mapDispatchToProps)(
    middleware(MyAccountTabListContainer, 'Component/MyAccountTabList/Container')
);
