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

import MyAccountNewsletterSubscription from 'Component/MyAccountNewsletterSubscription';
import MyAccountOverlay from 'Component/MyAccountOverlay';
import MyAccountAddressBook from 'Component/MyAccountAddressBook';
import MyAccountMyWishlist from 'Component/MyAccountMyWishlist';
import MyAccountDashboard from 'Component/MyAccountDashboard';
import MyAccountMyOrders from 'Component/MyAccountMyOrders';
import MyAccountTabList from 'Component/MyAccountTabList';
import ContentWrapper from 'Component/ContentWrapper';
import Meta from 'Component/Meta';
import {
    activeTabType,
    tabMapType,
    DASHBOARD,
    MY_ORDERS,
    MY_WISHLIST,
    ADDRESS_BOOK,
    NEWSLETTER_SUBSCRIPTION
} from 'Type/Account';

import './MyAccount.style';

class MyAccount extends PureComponent {
    static propTypes = {
        activeTab: activeTabType.isRequired,
        tabMap: tabMapType.isRequired,
        changeActiveTab: PropTypes.func.isRequired,
        onSignIn: PropTypes.func.isRequired,
        onSignOut: PropTypes.func.isRequired,
        isSignedIn: PropTypes.bool.isRequired
    };

    renderMap = {
        [DASHBOARD]: MyAccountDashboard,
        [MY_ORDERS]: MyAccountMyOrders,
        [MY_WISHLIST]: MyAccountMyWishlist,
        [ADDRESS_BOOK]: MyAccountAddressBook,
        [NEWSLETTER_SUBSCRIPTION]: MyAccountNewsletterSubscription
    };

    renderLoginOverlay() {
        const { onSignIn } = this.props;
        return <MyAccountOverlay onSignIn={ onSignIn } />;
    }

    renderContent() {
        const {
            activeTab,
            tabMap,
            changeActiveTab,
            isSignedIn,
            onSignOut
        } = this.props;

        if (!isSignedIn) {
            return this.renderLoginOverlay();
        }

        const TabContent = this.renderMap[activeTab];
        const { name } = tabMap[activeTab];

        return (
            <ContentWrapper
              label={ __('My Account page') }
              wrapperMix={ { block: 'MyAccount', elem: 'Wrapper' } }
            >
                <MyAccountTabList
                  tabMap={ tabMap }
                  activeTab={ activeTab }
                  changeActiveTab={ changeActiveTab }
                  onSignOut={ onSignOut }
                />
                <div block="MyAccount" elem="TabContent">
                    <h1 block="MyAccount" elem="Heading">{ name }</h1>
                    <TabContent />
                </div>
            </ContentWrapper>
        );
    }

    render() {
        return (
            <main block="MyAccount">
                <Meta metaObject={ { title: 'My Account' } } />
                { this.renderContent() }
            </main>
        );
    }
}

export default MyAccount;
