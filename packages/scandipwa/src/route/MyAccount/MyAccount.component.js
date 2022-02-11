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
import { Component, lazy, Suspense } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader/Loader.component';
import MyAccountInformation from 'Component/MyAccountInformation';
import MyAccountOrder from 'Component/MyAccountOrder';
import MyAccountOverlay from 'Component/MyAccountOverlay';
import MyAccountTabList from 'Component/MyAccountTabList';
import {
    ACCOUNT_INFORMATION,
    ActiveTabType,
    ADDRESS_BOOK,
    MY_ACCOUNT,
    MY_DOWNLOADABLE,
    MY_ORDER,
    MY_ORDERS,
    MY_WISHLIST,
    NEWSLETTER_SUBSCRIPTION,
    TabMapType
} from 'Type/Account.type';
import { LocationType, MatchType } from 'Type/Router.type';
import { isSignedIn } from 'Util/Auth';

import { ACCOUNT_ORDER_URL } from './MyAccount.config';

import './MyAccount.style';

export const MyAccountAddressBook = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "account-address" */
    'Component/MyAccountAddressBook'
));
export const MyAccountDashboard = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "account-dashboard" */
    'Component/MyAccountDashboard'
));
export const MyAccountDownloadable = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "account-downloadable" */
    'Component/MyAccountDownloadable'
));
export const MyAccountMyOrders = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "account-orders" */
    'Component/MyAccountMyOrders'
));
export const MyAccountMyWishlist = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "account-wishlist" */
    'Component/MyAccountMyWishlist'
));
export const MyAccountNewsletterSubscription = lazy(() => import(
    /* webpackMode: "lazy", webpackChunkName: "account-newsletter" */
    'Component/MyAccountNewsletterSubscription'
));

/** @namespace Route/MyAccount/Component */
export class MyAccount extends Component {
    static propTypes = {
        isEditingActive: PropTypes.bool.isRequired,
        subHeading: PropTypes.string,
        activeTab: ActiveTabType.isRequired,
        tabMap: TabMapType.isRequired,
        changeActiveTab: PropTypes.func.isRequired,
        onSignIn: PropTypes.func.isRequired,
        onSignOut: PropTypes.func.isRequired,
        location: LocationType.isRequired,
        match: MatchType.isRequired,
        changeTabName: PropTypes.func.isRequired,
        tabName: PropTypes.string,
        setTabSubheading: PropTypes.func.isRequired
    };

    static defaultProps = {
        subHeading: '',
        tabName: null
    };

    renderMap = {
        [MY_ACCOUNT]: MyAccountDashboard,
        [MY_ORDER]: MyAccountOrder,
        [MY_ORDERS]: MyAccountMyOrders,
        [MY_WISHLIST]: MyAccountMyWishlist,
        [ADDRESS_BOOK]: MyAccountAddressBook,
        [NEWSLETTER_SUBSCRIPTION]: MyAccountNewsletterSubscription,
        [MY_DOWNLOADABLE]: MyAccountDownloadable,
        [ACCOUNT_INFORMATION]: MyAccountInformation
    };

    shouldComponentUpdate(nextProps) {
        const {
            activeTab,
            location: { pathname },
            tabName,
            subHeading
        } = this.props;
        const {
            activeTab: nextActiveTab,
            location: {
                pathname: nextPathname
            },
            tabName: nextTabName,
            subHeading: nextSubHeading
        } = nextProps;

        return (
            activeTab !== nextActiveTab
            || pathname !== nextPathname
            || tabName !== nextTabName
            || subHeading !== nextSubHeading
        );
    }

    getTabContent() {
        const { activeTab, location: { pathname } } = this.props;

        if (activeTab === MY_ORDERS && pathname.includes(ACCOUNT_ORDER_URL)) {
            return this.renderMap[MY_ORDER];
        }

        return this.renderMap[activeTab];
    }

    renderLoginOverlay() {
        const { onSignIn } = this.props;

        return (
            <MyAccountOverlay
              onSignIn={ onSignIn }
            />
        );
    }

    renderSubHeading() {
        const { subHeading } = this.props;

        if (!subHeading) {
            return null;
        }

        return <span block="MyAccount" elem="SubHeading">{ subHeading }</span>;
    }

    renderContent() {
        const {
            activeTab,
            tabMap,
            changeActiveTab,
            onSignOut,
            isEditingActive,
            match,
            changeTabName,
            tabName,
            setTabSubheading
        } = this.props;

        if (!isSignedIn()) {
            return this.renderLoginOverlay();
        }

        const TabContent = this.getTabContent();
        const { title } = tabMap[activeTab];

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
                <div
                  block="MyAccount"
                  elem="TabContent"
                  mods={ { activeTab } }
                >
                    <h2 block="MyAccount" elem="Heading">
                        { title || tabName }
                        { this.renderSubHeading() }
                    </h2>
                    <Suspense fallback={ <Loader /> }>
                        <TabContent
                          isEditingActive={ isEditingActive }
                          match={ match }
                          changeTabName={ changeTabName }
                          setTabSubheading={ setTabSubheading }
                        />
                    </Suspense>
                </div>
            </ContentWrapper>
        );
    }

    render() {
        return (
            <main block="MyAccount">
                { this.renderContent() }
            </main>
        );
    }
}

export default MyAccount;
